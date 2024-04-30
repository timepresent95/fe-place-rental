import Link from "next/link";

import MainLogo from "@/6.shared/ui/Icon/MainLogo";

function SignupSuccessPage() {
  return (
    <main className="px-4 container">
      <div className="mt-40 flex flex-col items-center">
        <Link href="/">
          <div className="bg-indigo-700 w-44 p-4 flex justify-center rounded-xl">
            <MainLogo />
          </div>
        </Link>
        <p className="text-2xl font-bold mt-10">회원 가입이 완료되었습니다.</p>
        <Link
          href="/login"
          className="text-indigo-700 text-lg font-semibold mt-4">
          로그인 화면으로 이동
        </Link>
      </div>
    </main>
  );
}

SignupSuccessPage.displayName = "SignupSuccessPage";

export default SignupSuccessPage;
