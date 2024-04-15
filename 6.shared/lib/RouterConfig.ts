interface RouteInfo {
  pageName: string;
  path: string;
}

const RouterConfig: RouteInfo[] = [
  { pageName: "홈 화면", path: "/" },
  { pageName: "예약 현황", path: "/reservation/list" },
  { pageName: "대관 예약", path: "/reservation/post" },
];

export default RouterConfig;
