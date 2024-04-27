"use client";

import { usePathname } from "next/navigation";

import { routerInfos } from "@/6.shared/lib/RouterConfig";

function PageTitle() {
  const pathname = usePathname();
  const pageInfo = routerInfos.find((v) => v.path === pathname);
  return pageInfo?.showTitle ? (
    <h1 className="text-3xl font-semibold text-center my-8">
      {pageInfo.pageName}
    </h1>
  ) : null;
}

PageTitle.displayName = "PageTitle";

export default PageTitle;
