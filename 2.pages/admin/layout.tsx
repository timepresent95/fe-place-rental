import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMy } from "@/5.entities/User/api";

async function AdminLayout({ children }: PropsWithChildren) {
  const result = await getMy();

  if (result.status === "error" || result.data.authority !== "admin") {
    redirect("/");
  }

  return children;
}

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
