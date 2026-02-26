import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is authenticated for admin routes
    if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
      const token = req.nextauth.token;

      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }

        // Require authentication for dashboard
        if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
          return token !== null;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
