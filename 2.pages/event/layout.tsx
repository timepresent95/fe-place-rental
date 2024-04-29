import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMy } from "@/5.entities/User/api";

async function EventLayout({ children }: PropsWithChildren) {
  const result = await getMy();
  if (result.status === "error" || result.data.authority !== "user") {
    redirect("/");
  }

  return children;
}

EventLayout.displayName = "EventLayout";

export default EventLayout;
