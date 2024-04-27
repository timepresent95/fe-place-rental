export interface RouteInfo {
  pageName: string;
  path: string;
  hideAtNavigation?: boolean;
  showTitle?: boolean;
}

export const guestOnlyRoutes: RouteInfo[] = [
  { pageName: "로그인", path: "/login", hideAtNavigation: true },
  { pageName: "회원 가입", path: "/signup", hideAtNavigation: true },
];

export const protectedRoutes: RouteInfo[] = [];

export const adminRoutes: RouteInfo[] = [
  {
    pageName: "장소 대여 신청 관리",
    path: "/admin/management/rental",
    showTitle: true,
  },
];

export const publicRoutes: RouteInfo[] = [
  { pageName: "서비스 소개", path: "/" },
  { pageName: "장소 대여 신청 현황", path: "/rental/list", showTitle: true },
  { pageName: "장소 대여 신청", path: "/rental/apply", showTitle: true },
  {
    pageName: "나의 신청 현황",
    path: "/my/reservation",
    showTitle: true,
  },
];

export const routerInfos: RouteInfo[] = [
  ...guestOnlyRoutes,
  ...protectedRoutes,
  ...publicRoutes,
];
