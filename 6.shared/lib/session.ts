import "server-only";

import { cookies } from "next/headers";

export async function createSession(cookie: string) {
  cookies().set("session", cookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}
