"use client";

import { useState } from "react";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { useUserContext } from "@/5.entities/User/lib/context";
import { useClickOutside } from "@/6.shared/lib/useClickoutside";
import { routeGroups } from "@/6.shared/Router/model";
import RouteGroupList from "@/6.shared/Router/ui/RouteGroupList";

const IGNORE_CLICK_CLASS = "right-navigation-drawer";

function RightNavigation() {
  const [hide, setHide] = useState(true);
  const currentPath = usePathname();
  const { authority } = useUserContext();

  useClickOutside(() => setHide(true), IGNORE_CLICK_CLASS);

  return (
    <div
      className={clsx(
        IGNORE_CLICK_CLASS,
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
          <ChevronLeft className={clsx(IGNORE_CLICK_CLASS)} />
        ) : (
          <ChevronRight className={clsx(IGNORE_CLICK_CLASS)} />
        )}
      </button>
      <div className="px-4">
        <RouteGroupList
          authority={authority}
          currentPath={currentPath}
          onClick={() => setHide(true)}
        />
      </div>
    </div>
  );
}

RightNavigation.displayName = "RightNavigation";

export default RightNavigation;
