"use server";

import { deleteSession } from "@/6.shared/lib/session";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  deleteSession();
  redirect("/");
}
