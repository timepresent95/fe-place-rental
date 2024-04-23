"use client";

import { routerInfos } from "@/6.shared/lib/RouterConfig";
import { useClickOutside } from "@/6.shared/lib/useClickoutside";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const IGNORE_CLASS_NAME = "right-navigation-drawer";

function RightNavigationDrawer() {
  const [hide, setHide] = useState(true);
  const currentPath = usePathname();

  useClickOutside(() => setHide(true), IGNORE_CLASS_NAME);

  return (
    <div
      className={clsx(
        IGNORE_CLASS_NAME,
        "fixed right-0 w-56 z-10 border-l transition-transform border-slate bg-white h-full shadow pt-12 pr-4 pl-12 space-y-4",
        {
          "translate-x-full": hide,
        }
      )}>
      <button
        onClick={() => setHide(!hide)}
        className={clsx(
          "absolute left-0 -translate-x-full bg-white top-24 border-y border-l rounded-s border-slate py-3 px-1 shadow"
        )}>
        {hide ? (
          <ChevronLeft className={clsx(IGNORE_CLASS_NAME)} />
        ) : (
          <ChevronRight className={clsx(IGNORE_CLASS_NAME)} />
        )}
      </button>
      {routerInfos.map(({ pageName, path, hideAtNavigation }) =>
        hideAtNavigation ? null : (
          <Link
            onClick={() => {
              setHide(true);
            }}
            key={path}
            href={path}
            className={clsx("font-bold text-xl block hover:text-indigo-500", {
              "text-indigo-700": path === currentPath,
            })}>
            {pageName}
          </Link>
        )
      )}
    </div>
  );
}

export default RightNavigationDrawer;
