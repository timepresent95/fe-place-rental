import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getFilteredRoute } from "./6.shared/Router/lib";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isUserOnly = getFilteredRoute("user").find((v) => v.path === path);
  const isGuestOnly = getFilteredRoute("guest").find((v) => v.path === path);

  const cookie = cookies().get("session")?.value;

  if (isUserOnly && !cookie) {
    //TODO: 로그인 완료 이후 redirection 될 url을 query에 추가
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isGuestOnly && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
