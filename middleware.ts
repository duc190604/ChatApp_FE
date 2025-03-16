import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = request.cookies.get("token") !== undefined;
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
}

export const config = {
  matcher: "/",
};
