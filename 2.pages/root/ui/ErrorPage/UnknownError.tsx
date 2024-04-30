import Link from "next/link";

import MainLogo from "@/6.shared/ui/Icon/MainLogo";

function UnknownErrorPage() {
  return (
    <main className="px-4 container">
      <div className="mt-40 flex flex-col items-center">
        <Link href="/">
          <div className="bg-indigo-700 w-44 p-4 flex justify-center rounded-xl">
            <MainLogo />
          </div>
        </Link>
        <p className="text-2xl font-bold mt-10">
          알 수 없는 에러가 발생했습니다.
        </p>
      </div>
    </main>
  );
}

UnknownErrorPage.displayName = "UnknownErrorPage";

export default UnknownErrorPage;
