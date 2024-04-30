"use server";

import { revalidatePath } from "next/cache";

import { deleteSession } from "@/6.shared/lib/session";

export async function logoutAction() {
  revalidatePath("/admin", "layout");
  deleteSession();
}

