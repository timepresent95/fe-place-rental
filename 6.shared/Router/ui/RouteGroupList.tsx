import clsx from "clsx";
import Link from "next/link";

import { filterRouteGroup } from "../lib";
import { RouteAuthority } from "../model";

interface Props {
  authority: RouteAuthority;
  currentPath: string;
  onClick: () => void;
}

function RouteGroupList({ authority, currentPath, onClick }: Props) {
  const routeGroups = filterRouteGroup(authority);
  return (
    <>
      {routeGroups.map((v, index) => (
        <div key={v.name}>
          <h6 className="font-bold text-sm text-slate-600">{v.name}</h6>
          <div className="pr-2 pl-4 mt-2 space-y-2">
            {v.entries.map(({ name, path }) => (
              <Link
                onClick={onClick}
                key={name}
                href={path}
                className={clsx(
                  "font-bold text-xl block hover:text-indigo-500",
                  {
                    "text-indigo-700": path === currentPath,
                  }
                )}>
                {name}
              </Link>
            ))}
          </div>
          {index !== routeGroups.length - 1 && <hr className="mt-4 mb-8" />}
        </div>
      ))}
    </>
  );
}

RouteGroupList.displayName = "RouteGroupList";

export default RouteGroupList;
