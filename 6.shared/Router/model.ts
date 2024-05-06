export type RouteAuthority = "guest" | "user" | "admin";

//NOTE: authority를 입력하지 않은 경우 전체 허용
//NOTE: authority 우선순위: RouteGroup > Route
export interface Route {
  name: string;
  path: string;
  authority?: RouteAuthority[];
  hide?: boolean;
  hideTitle?: boolean;
}

export interface RouteGroup {
  name: string;
  authority?: RouteAuthority[];
  hide?: boolean;
  entries: Route[];
}

export const routeGroups: RouteGroup[] = [
  {
    name: "default",
    hide: true,
    entries: [{ name: "home", path: "/", hideTitle: true }],
  },
  {
    name: "guest-only",
    hide: true,
    entries: [
      {
        name: "로그인",
        path: "/login",
        authority: ["guest"],
      },
      {
        authority: ["guest"],
        name: "회원 가입",
        path: "/signup",
      },
      {
        name: "회원 가입 성공",
        path: "/signup/success",
        hideTitle: true,
        hide: true,
      },
    ],
  },
  {
    name: "user-only",
    hide: true,
    authority: ["user"],
    entries: [],
  },
  {
    name: "관리자",
    authority: ["admin"],
    entries: [
      {
        name: "장소 대여 신청 관리",
        path: "/admin/management/rental",
      },
    ],
  },
  {
    name: "장소 대여",
    entries: [
      { name: "장소 대여 신청", path: "/rental/apply" },
      { name: "장소 대여 신청 현황", path: "/rental/list" },
      {
        name: "장소 대여 신청 성공",
        path: "/rental/success",
        hideTitle: true,
        hide: true,
      },
    ],
  },
  {
    name: "모임 참여",
    authority: ["user"],
    entries: [{ name: "모임 목록", path: "/gathering/list" }],
  },
  {
    name: "마이 페이지",
    authority: ["user"],
    entries: [
      {
        name: "나의 신청 현황",
        path: "/my/reservation",
      },
      {
        name: "나의 모임 관리",
        path: "/my/gathering",
      },
    ],
  },
  {
    name: "임시",
    entries: [
      {
        name: "모든 파티 임시",
        path: "/party",
      },
    ],
  },
];
