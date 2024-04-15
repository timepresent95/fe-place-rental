"use client";

import RouterConfig from "@/6.shared/lib/RouterConfig";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function RightNavigationDrawer() {
  const [hide, setHide] = useState(true);
  const currentPath = usePathname();

  return (
    <div
      className={clsx(
        "fixed right-0 w-56 z-10 border-l transition-transform border-slate bg-white h-full shadow pt-12 pr-4 pl-12 space-y-4",
        {
          "translate-x-full": hide,
        }
      )}>
      <button
        onClick={() => setHide(!hide)}
        className="absolute left-0 -translate-x-full top-24 border-y border-l rounded-s border-slate py-3 px-1 shadow">
        {hide ? <ChevronLeft /> : <ChevronRight />}
      </button>
      {RouterConfig.map(({ name, path }) => (
        <Link
          key={path}
          href={path}
          className={clsx("font-bold text-xl block hover:text-indigo-500", {
            "text-indigo-700": path === currentPath,
          })}>
          {name}
        </Link>
      ))}
    </div>
  );
}

export default RightNavigationDrawer;
