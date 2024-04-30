import { routeGroups, type RouteAuthority } from "./model";

export function filterRouteGroup(authority: RouteAuthority) {
  return routeGroups
    .map((v) => ({
      ...v,
      entries: v.entries.filter((v) => {
        if (v.hide) {
          return false;
        }
        if (v.authority) {
          return v.authority.includes(authority);
        }
        return true;
      }),
    }))
    .filter((v) => {
      if (v.entries.length === 0) {
        return false;
      }
      if (v.hide) {
        return false;
      }
      if (v.authority) {
        return v.authority.includes(authority);
      }
      return true;
    });
}

export function getFilteredRoute(authroity: RouteAuthority) {
  return routeGroups.flatMap((group) => {
    if (group.authority && group.authority.includes(authroity)) {
      return group.entries;
    }
    return group.entries.filter((route) => {
      return route.authority && route.authority.includes(authroity);
    });
  });
}

export function findRouteByPath(path: string) {
  for (const group of routeGroups) {
    for (const route of group.entries) {
      if (route.path === path) {
        return route;
      }
    }
  }
  throw new Error("page not found");
}
