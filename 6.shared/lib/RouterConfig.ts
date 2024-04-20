export interface RouteInfo {
  pageName: string;
  path: string;
  hideAtNavigation?: boolean;
}

export const guestOnlyRoutes: RouteInfo[] = [
  { pageName: "로그인", path: "/login", hideAtNavigation: true },
  { pageName: "회원 가입", path: "/signup", hideAtNavigation: true },
];

export const protectedRoutes: RouteInfo[] = [];

export const publicRoutes: RouteInfo[] = [
  { pageName: "홈 화면", path: "/" },
  { pageName: "예약 현황", path: "/reservation/list" },
  { pageName: "대관 예약", path: "/reservation/post" },
];

export const routerInfos: RouteInfo[] = [
  ...guestOnlyRoutes,
  ...protectedRoutes,
  ...publicRoutes,
];
