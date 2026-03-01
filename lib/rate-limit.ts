// ---------------------------------------------------------------------------
// Rate limiting — HIGH-2 + MED-1 fixes
//
// When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are configured the
// limiter uses Upstash Redis, which is shared across all serverless instances
// and survives cold starts (MED-1 fix).
//
// When Redis is not configured (local dev), an in-memory fallback is used
// with a console warning.
//
// IP extraction (HIGH-2 fix):
//   1. NextRequest.ip  — populated by Vercel Edge at the true network level;
//      cannot be spoofed by request headers.
//   2. x-real-ip      — second preference; set by Vercel/Nginx, not by clients.
//   3. x-forwarded-for — last resort; only the LAST (rightmost) entry is used
//      because that is what Vercel's infrastructure appends and is trusted.
//      Taking the first entry (common mistake) allows header injection by clients.
// ---------------------------------------------------------------------------

import type { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3,
};

// ---------------------------------------------------------------------------
// Upstash Redis helpers (optional — only used when env vars are present)
// ---------------------------------------------------------------------------
async function redisIncr(key: string, windowMs: number): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || url === "https://xxx.upstash.io") return -1; // not configured

  try {
    // Pipeline: INCR + PEXPIRE (set TTL only on first write)
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["PEXPIRE", key, windowMs, "NX"], // NX = only set if no TTL yet
      ]),
      cache: "no-store",
    });
    if (!res.ok) return -1;
    const data = await res.json();
    // Pipeline returns array of results; first is INCR result
    return Number(data[0]?.result ?? -1);
  } catch {
    return -1; // Redis unavailable; fall through to in-memory
  }
}

// ---------------------------------------------------------------------------
// checkRateLimit
// ---------------------------------------------------------------------------
export async function checkRateLimit(
  identifier: string,
  options: Partial<RateLimitOptions> = {}
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}> {
  const { windowMs, maxRequests } = { ...DEFAULT_OPTIONS, ...options };
  const now = Date.now();
  const resetTime = now + windowMs;

  // --- Try Upstash Redis first (MED-1 fix: persistent across instances) ---
  const redisCount = await redisIncr(`rl:${identifier}`, windowMs);
  if (redisCount !== -1) {
    const success = redisCount <= maxRequests;
    return {
      success,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - redisCount),
      resetTime,
    };
  }

  // --- In-memory fallback (dev / Redis unavailable) ---
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[rate-limit] Redis not configured — using in-memory fallback. " +
        "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for production."
    );
  }

  const entry = rateLimitStore.get(identifier);
  if (entry && entry.resetTime < now) rateLimitStore.delete(identifier);

  const current = rateLimitStore.get(identifier);

  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { success: true, limit: maxRequests, remaining: maxRequests - 1, resetTime };
  }

  if (current.count >= maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0, resetTime: current.resetTime };
  }

  current.count++;
  rateLimitStore.set(identifier, current);
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - current.count,
    resetTime: current.resetTime,
  };
}

// ---------------------------------------------------------------------------
// getClientIp — HIGH-2 fix: no longer blindly trusts X-Forwarded-For
// ---------------------------------------------------------------------------
export function getClientIp(request: NextRequest): string {
  // 1. Vercel/Next.js Edge populates request.ip at the network layer
  if ((request as NextRequest & { ip?: string }).ip) {
    return (request as NextRequest & { ip?: string }).ip!;
  }

  // 2. x-real-ip is set by trusted reverse proxies (Vercel, Nginx)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // 3. x-forwarded-for: take the RIGHTMOST (last) value, which is appended by
  //    the infrastructure and cannot be injected by the client.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((s) => s.trim());
    return parts[parts.length - 1]; // last = added by trusted proxy
  }

  return "unknown";
}
