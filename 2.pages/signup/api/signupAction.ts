"use server";

import { redirect } from "next/navigation";
import { extractSignupBody } from "../lib";
import { postSignup } from "@/5.entities/authentication/api";
import { createSession } from "@/6.shared/lib/session";

export default async function signupAction(formData: FormData) {
  const signupBody = extractSignupBody(formData);
  const result = await postSignup(signupBody);
  if (result.status === "error") {
    return;
  }

  createSession(result.data.uid);
  redirect("/signup/success");
}
