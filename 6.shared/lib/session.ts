import "server-only";

import { cookies } from "next/headers";

export function createSession(token: string) {
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 3, //NOTE: 3 hour
  });
}

export function deleteSession() {
  cookies().delete("session");
}
