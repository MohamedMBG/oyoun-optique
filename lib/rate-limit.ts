interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory rate limit store
// For production, use Redis (Upstash) instead
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3,
};

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

  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries
  if (entry && entry.resetTime < now) {
    rateLimitStore.delete(identifier);
  }

  const currentEntry = rateLimitStore.get(identifier);

  if (!currentEntry) {
    // First request
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (currentEntry.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetTime: currentEntry.resetTime,
    };
  }

  // Increment count
  currentEntry.count++;
  rateLimitStore.set(identifier, currentEntry);

  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - currentEntry.count,
    resetTime: currentEntry.resetTime,
  };
}

// Get client IP from request headers
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to a default (in production, use proper IP detection)
  return "unknown";
}
