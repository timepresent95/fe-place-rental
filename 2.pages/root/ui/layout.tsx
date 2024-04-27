import { Noto_Sans } from "next/font/google";
import { cn } from "@/6.shared/lib/tailwindMerge";
import { Mail } from "lucide-react";
import Link from "next/link";
import TooltipWrapper from "@/5.entities/TooltipWrapper/ui";
import { GithubIcon, TistoryIcon } from "@/6.shared/ui/Icon";
import { PropsWithChildren } from "react";
import RightNavigation from "./RightNavigation";
import MainLogo from "@/6.shared/ui/Icon/MainLogo";
import { Button } from "@/6.shared/ui/shardcn/ui/button";
import { cookies } from "next/headers";
import logoutAction from "../api/logoutAction";
import PageTitle from "./PageTitle";

const NotoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: PropsWithChildren) {
  const isAuthenticated = cookies().get("session")?.value;

  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-[130vh] bg-background font-sans antialiased",
          NotoSans.variable
        )}>
        <RightNavigation />
        <header
          className="py-5 bg-indigo-700 mb-8"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="container px-4 flex justify-between items-center">
            <Link href="/">
              <MainLogo />
            </Link>
            {isAuthenticated ? (
              <div>
                <form action={logoutAction}>
                  <Button variant="outline">로그 아웃</Button>
                </form>
              </div>
            ) : (
              <div className="space-x-2">
                <Link href="/signup">
                  <Button variant="outline">회원 가입</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">로그인</Button>
                </Link>
              </div>
            )}
          </div>
        </header>
        <main className="container">
          <PageTitle />
          {children}
        </main>
        <footer className="mt-auto pt-12">
          <div
            className="bg-indigo-700 px-11 pb-8 pt-10 text-sm text-white"
            style={{ boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.05)" }}>
            <div className="flex justify-between">
              <div>
                <MainLogo />
                <div className="mt-2">
                  <p>
                    본 페이지는 시설 대관 및 행사 참여를 위한
                    프로토타입페이지입니다.
                  </p>
                  <p>
                    이 페이지는 학술 목적으로만 제작되었으며, 실제 서비스와는
                    무관합니다. <br />
                    서비스와 관련하여 문의사항이 있으면 우측 링크를 통해
                    연락바랍니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <TooltipWrapper message="timepresent95@gmail.com">
                  <Link
                    href="mailto:timepresent95@gmail.com"
                    className="rounded-full bg-white p-1 text-black hover:bg-slate-200">
                    <Mail className="h-4 w-4" />
                  </Link>
                </TooltipWrapper>
                <TooltipWrapper message="github">
                  <Link
                    href="https://github.com/timepresent95/fe-hyu-facility-rental"
                    className="rounded-full bg-white p-1 hover:bg-slate-200">
                    <GithubIcon className="h-4 w-4" />
                  </Link>
                </TooltipWrapper>
                <TooltipWrapper message="blog">
                  <Link
                    href="https://an-thropology.tistory.com/"
                    className="rounded-full bg-white p-1.5 hover:bg-slate-200">
                    <TistoryIcon className="h-3 w-3" />
                  </Link>
                </TooltipWrapper>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
