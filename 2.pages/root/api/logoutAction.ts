"use server";

import { deleteSession } from "@/6.shared/lib/session";
import { revalidatePath } from "next/cache";

export default async function logoutAction() {
  revalidatePath("/admin", "layout");
  deleteSession();
}
