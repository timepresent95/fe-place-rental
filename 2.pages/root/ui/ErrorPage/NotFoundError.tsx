import MainLogo from "@/6.shared/ui/Icon/MainLogo";
import Link from "next/link";

function NotFoundErrorPage() {
  return (
    <main className="px-4 container">
      <div className="mt-40 flex flex-col items-center">
        <Link href="/">
          <div className="bg-indigo-700 w-44 p-4 flex justify-center rounded-xl">
            <MainLogo />
          </div>
        </Link>
        <p className="text-2xl font-bold mt-10">존재하지 않는 페이지입니다.</p>
      </div>
    </main>
  );
}

NotFoundErrorPage.displayName = "NotFountErrorPage";

export default NotFoundErrorPage;
