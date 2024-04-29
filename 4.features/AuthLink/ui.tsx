"use client";

import { PropsWithChildren } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useUserContext } from "@/5.entities/User/lib/context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/6.shared/ui/shardcn/ui/alert-dialog";

interface Props extends PropsWithChildren {
  title?: string;
  description?: string;
  href: string;
}

function AuthLink({ children, title, description, href }: Props) {
  const router = useRouter();
  const { authority } = useUserContext();

  return authority === "guest" ? (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>뒤로 가기</AlertDialogCancel>
          <AlertDialogAction onClick={() => router.push("/login")}>
            로그인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

AuthLink.displayName = "AuthLink";

export default AuthLink;
