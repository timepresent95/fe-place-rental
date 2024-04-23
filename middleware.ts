import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { guestOnlyRoutes, protectedRoutes } from "./6.shared/lib/RouterConfig";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((v) => v.path === path);
  const isGuestOnlyRoute = guestOnlyRoutes.find((v) => v.path === path);

  const cookie = cookies().get("session")?.value;

  if (isProtectedRoute && cookie) {
    //TODO: 로그인 완료 이후 redirection 될 url을 query에 추가
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isGuestOnlyRoute && cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
