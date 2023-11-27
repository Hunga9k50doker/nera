import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearCookieAction } from "./actions";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access_token");
  if (
    !cookie?.value &&
    !request.nextUrl.pathname.startsWith("/sign-in") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (cookie?.value && request.nextUrl.pathname.startsWith("/sign-in")) {
    // return NextResponse.redirect(new URL("/", request.url));
    clearCookieAction();
  }
  return NextResponse.next();
}
