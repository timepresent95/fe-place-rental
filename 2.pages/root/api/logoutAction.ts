"use server";

import { deleteSession } from "@/6.shared/lib/session";

export default async function logoutAction() {
  deleteSession();
}
