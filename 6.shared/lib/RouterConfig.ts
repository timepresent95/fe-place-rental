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
  { pageName: "서비스 소개", path: "/" },
  { pageName: "대관 신청 현황", path: "/rental/list" },
  { pageName: "대관 예약 신청", path: "/rental/apply" },
  { pageName: "나의 대관 예약", path: "/my/reservation" },
];

export const routerInfos: RouteInfo[] = [
  ...guestOnlyRoutes,
  ...protectedRoutes,
  ...publicRoutes,
];
