import { useEffect } from "react";

import Link from "next/link";

import MainLogo from "@/6.shared/ui/Icon/MainLogo";

import logoutAction from "../../api/logoutAction";

function WrongAuthenticatedErrorPage() {
  useEffect(() => {
    const logout = async () => {
      await logoutAction();
    };

    logout();
  }, []);
  return (
    <main className="px-4 container">
      <div className="mt-40 flex flex-col items-center">
        <Link href="/">
          <div className="bg-indigo-700 w-44 p-4 flex justify-center rounded-xl">
            <MainLogo />
          </div>
        </Link>
        <p className="text-2xl font-bold mt-10">잘못된 로그인 정보입니다.</p>
      </div>
    </main>
  );
}

WrongAuthenticatedErrorPage.displayName = "WrongAuthenticatedErrorPage";

export default WrongAuthenticatedErrorPage;
