"use client";

import { routerInfos } from "@/6.shared/lib/RouterConfig";
import { usePathname } from "next/navigation";

function PageTitle() {
  const pathname = usePathname();
  const pageInfo = routerInfos.find((v) => v.path === pathname);
  return pageInfo ? (
    <h1 className="text-3xl font-semibold text-center mb-8">
      {pageInfo.pageName}
    </h1>
  ) : null;
}

PageTitle.displayName = "PageTitle";

export default PageTitle;
