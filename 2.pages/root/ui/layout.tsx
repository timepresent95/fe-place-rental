import { PropsWithChildren } from "react";

import { Noto_Sans } from "next/font/google";

import Footer from "@/3.widgets/Footer/ui";
import Header from "@/3.widgets/Header/ui";
import PageTitle from "@/3.widgets/PageTitle/ui";
import RightNavigation from "@/3.widgets/RightNavigation/ui";
import { getMy } from "@/5.entities/User/api";
import UserProvider from "@/5.entities/User/lib/context";
import { User } from "@/5.entities/User/model";
import { cn } from "@/6.shared/lib/tailwindMerge";
import { Toaster } from "@/6.shared/ui/shardcn/ui/sonner";
const NotoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({ children }: PropsWithChildren) {
  let userInfo: User | null = null;

  const result = await getMy();

  if (result.status === "success") {
    userInfo = result.data;
  }

  return (
    <html lang="en">
      <UserProvider userInfo={userInfo ? userInfo : { authority: "guest" }}>
        <body
          className={cn(
            "flex flex-col min-h-[130vh] bg-background font-sans antialiased",
            NotoSans.variable
          )}>
          <Header />
          <main>
            <PageTitle />
            <RightNavigation />
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
