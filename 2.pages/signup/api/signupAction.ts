"use server";

import { redirect } from "next/navigation";
import { extractSignupBody } from "../lib";
import { postSignup } from "@/5.entities/authentication/api";

export default async function signupAction(formData: FormData) {
  const signupBody = extractSignupBody(formData);
  await postSignup(signupBody);
  redirect("/signup/success");
}
