import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");
  const roleCookie = req.cookies.get("role");

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (!roleCookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const role = roleCookie.value;

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/adminDashboard")) {
    if (role !== "adminVet") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/vetDashboard")) {
    if (role !== "veterinarian" && role !== "adminVet") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/userDashboard")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pet/:path*",
    "/vet/:path*",
    "/userDashboard/:path*",
    "/adminDashboard/:path*",
    "/vetDashboard/:path*",
    "/cart/:path*",
    "/appointment/:path*",
  ],
};
