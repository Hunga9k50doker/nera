import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access_token");
  // if (!cookie?.value && request.nextUrl.pathname !== "/sign-in") {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
  // if (cookie?.value && request.nextUrl.pathname === "/sign-in") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  return NextResponse.next();
}
