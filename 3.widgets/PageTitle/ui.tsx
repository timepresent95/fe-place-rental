"use client";

import { usePathname } from "next/navigation";

import { findRouteByPath } from "@/6.shared/Router/lib";
import RouteName from "@/6.shared/Router/ui/RouteName";

function PageTitle() {
  const currentRoute = findRouteByPath(usePathname());
  return <RouteName route={currentRoute} />;
}

export default PageTitle;
