import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/6.shared/lib/tailwindMerge";
import { MapPin, Mail } from "lucide-react";
import Link from "next/link";
import TooltipWrapper from "@/5.entities/TooltipWrapper/ui";
import { GithubIcon, TistoryIcon } from "@/6.shared/ui/Icon";

const NotoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Place Rental",
  description: "Place Rental Service",
};

function MainLogo() {
  return (
    <div className="flex">
      <div className="w-7 rounded-full h-7 flex justify-center items-center border border-indigo-700 outline outline-white">
        <MapPin className="text-white" size={20} />
      </div>
      <span className="text-lg font-bold ml-2 text-white pb-1">
        place rental
      </span>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-[130vh] bg-background font-sans antialiased",
          NotoSans.variable
        )}>
        <header
          className="py-5 bg-indigo-700 mb-8"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="container px-4">
            <Link href="/">
              <MainLogo />
            </Link>
          </div>
        </header>
        {children}
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
