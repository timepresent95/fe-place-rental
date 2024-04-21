import "server-only";

import { cookies } from "next/headers";

export function createSession(token: string) {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}
