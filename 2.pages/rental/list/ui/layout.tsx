import { routerInfos } from "@/6.shared/lib/RouterConfig";
import { PropsWithChildren } from "react";

export default async function RentalListLayout({
  children,
}: PropsWithChildren) {
  const pageName = routerInfos.find((v) => v.path === "/rental/list");
  if (pageName === undefined) {
    //TODO: 등록되지 않은 경로에 대한 에러
    throw new Error("등록되지 않은 에러입니다.");
  }
  return (
    <main className="px-4 container">
      <h1 className="text-3xl font-semibold text-center mb-8">
        {pageName.pageName}
      </h1>
      {children}
    </main>
  );
}
