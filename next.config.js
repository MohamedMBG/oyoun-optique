/** @type {import('next').NextConfig} */

// Set ALLOWED_ORIGIN in your hosting environment (e.g. https://oyoun-optique.com).
// Falls back to localhost for local development.
const ALLOWED_ORIGIN =
  process.env.ALLOWED_ORIGIN || "http://localhost:3000";

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer leakage control
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // tighten after audit of inline scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      // Security headers on all routes
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // CORS — restricted to ALLOWED_ORIGIN only (CRIT-2 fix)
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: ALLOWED_ORIGIN },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          // Vary ensures caches don't serve one origin's response to another
          { key: "Vary", value: "Origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
