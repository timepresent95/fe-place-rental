"use server";

import { redirect } from "next/navigation";
import { extractLoginBody } from "../lib";
import { postLogin } from "@/5.entities/authentication/api";

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

  const { statusCode } = result.error;
  if (statusCode === 401) {
    return "아이디 또는 비밀번호를 알수 없습니다.";
  }

  throw result.error;
}
