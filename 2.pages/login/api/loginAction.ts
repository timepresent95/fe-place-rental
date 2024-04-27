"use server";

import { redirect } from "next/navigation";

import { postLogin } from "@/5.entities/authentication/api";

import { extractLoginBody } from "../lib";

//TODO: prevState는 어디에 사용하는것인지 알아보기
export default async function loginAction(
  prevState: string | undefined,
  formData: FormData
) {
  const signupBody = extractLoginBody(formData);
  const result = await postLogin(signupBody);

  if (result.status === "success") {
    return redirect("/");
  }

  const { detailCode } = result.error;
  if (detailCode === 40100) {
    return "인증되지 않은 사용자 입니다.";
  }

  if (detailCode === 40101) {
    return "아이디를 알수 없습니다.";
  }

  if (detailCode === 40102) {
    return "비밀번호가 잘못되었습니다.";
  }

  throw result.error;
}
