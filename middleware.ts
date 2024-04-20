import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/6.shared/lib/session";
import { cookies } from "next/headers";
import { guestOnlyRoutes, protectedRoutes } from "./6.shared/lib/RouterConfig";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((v) => v.path === path);
  const isGuestOnlyRoute = guestOnlyRoutes.find((v) => v.path === path);

  const cookie = cookies().get("session")?.value;
  const decryptResult = await decrypt(cookie);

  if (isProtectedRoute && decryptResult.status === "error") {
    //TODO: 로그인 완료 이후 redirection 될 url을 query에 추가
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isGuestOnlyRoute && decryptResult.status === "success") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
