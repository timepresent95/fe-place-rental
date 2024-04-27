"use client";

import { useState } from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthentication } from "@/5.entities/authentication/lib/context";
import { routerInfos, adminRoutes } from "@/6.shared/lib/RouterConfig";
import { useClickOutside } from "@/6.shared/lib/useClickoutside";

const IGNORE_CLASS_NAME = "right-navigation-drawer";

function RightNavigation() {
  const [hide, setHide] = useState(true);
  const currentPath = usePathname();
  const authentication = useAuthentication();

  useClickOutside(() => setHide(true), IGNORE_CLASS_NAME);

  return (
    <div
      className={clsx(
        IGNORE_CLASS_NAME,
        "fixed top-0 right-0 w-56 z-50 border-l transition-transform border-slate bg-white h-full shadow pt-12 ",
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
      <span className="font-bold text-sm text-slate-500 pr-2 pl-4">
        서비스 페이지
      </span>
      <div className="space-y-4 pr-4 pl-12  mt-4">
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

      {authentication.role === "admin" && (
        <div className="mt-20 border-t pt-8 mx-2">
          <span className="font-bold text-sm text-slate-500 pr-2 pl-4">
            관리자 페이지
          </span>
          <div className="pr-2 pl-8 mt-4">
            {adminRoutes.map(({ pageName, path, hideAtNavigation }) =>
              hideAtNavigation ? null : (
                <Link
                  onClick={() => {
                    setHide(true);
                  }}
                  key={path}
                  href={path}
                  className={clsx(
                    "font-bold text-xl block hover:text-indigo-500",
                    {
                      "text-indigo-700": path === currentPath,
                    }
                  )}>
                  {pageName}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

RightNavigation.displayName = "RightNavigation";

export default RightNavigation;
