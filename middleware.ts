import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Redirect unauthenticated users to login for any /admin route except the login page itself
    if (!token && req.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // The login page is always accessible
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }

        // Every other /admin/* route requires a valid session token (LOW-1 fix)
        return !!token;
      },
    },
  }
);

export const config = {
  // Protect ALL /admin routes
  matcher: ["/admin/:path*"],
};
