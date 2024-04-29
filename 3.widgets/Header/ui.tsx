"use client";

import Link from "next/link";
import { toast } from "sonner";

import { logoutAction } from "@/5.entities/User/lib/action";
import { useUserContext } from "@/5.entities/User/lib/context";
import MainLogo from "@/6.shared/ui/Icon/MainLogo";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

function Header() {
  const { authority } = useUserContext();
  return (
    <header
      className="py-5 bg-indigo-700 sticky top-0 z-40"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="container px-4 flex justify-between items-center">
        <Link href="/">
          <MainLogo />
        </Link>
        {authority === "guest" ? (
          <div className="space-x-2">
            <Link href="/signup">
              <Button variant="outline">회원 가입</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">로그인</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Button
              variant="outline"
              onClick={() => {
                logoutAction().then(() => toast("로그아웃이 완료되었습니다."));
              }}>
              로그 아웃
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

Header.displayName = "Header";

export default Header;
