"use server";

import { redirect } from "next/navigation";

import { postSignup } from "@/5.entities/authentication/api";

import { extractSignupBody } from "../lib";

export default async function signupAction(formData: FormData) {
  const signupBody = extractSignupBody(formData);
  const result = await postSignup(signupBody);
  if (result.status === "error") {
    throw result.error;
  }

  redirect("/signup/success");
}
