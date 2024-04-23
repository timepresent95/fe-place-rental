import MainLogo from "@/6.shared/ui/Icon/MainLogo";
import Link from "next/link";

function RentalSuccessPage() {
  return (
    <main className="px-4 container">
      <div className="mt-40 flex flex-col items-center">
        <Link href="/">
          <div className="bg-indigo-700 w-44 p-4 flex justify-center rounded-xl">
            <MainLogo />
          </div>
        </Link>
        <p className="text-2xl font-bold mt-10">
          대관 예약 신청이 완료되었습니다.
        </p>
        <Link
          href="/rental/list"
          className="text-indigo-700 text-lg font-semibold mt-4">
          예약 목록으로 가기
        </Link>
      </div>
    </main>
  );
}

RentalSuccessPage.displayName = "RentalSuccessPage";

export default RentalSuccessPage;
