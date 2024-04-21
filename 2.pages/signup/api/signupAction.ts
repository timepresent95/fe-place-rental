"use server";

import { redirect } from "next/navigation";
import { extractSignupBody } from "../lib";
import { postSignup } from "@/5.entities/authentication/api";

export default async function signupAction(formData: FormData) {
  const signupBody = extractSignupBody(formData);
  const result = await postSignup(signupBody);
  if (result.status === "error") {
    throw result.error;
  }

  redirect("/signup/success");
}
