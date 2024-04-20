import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { UserInfo } from "@/5.entities/authentication/model";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const EXPIRE_DURATION = 7 * 24 * 60 * 60 * 1000;

//TODO: registered claims 적용해야 함
type JwtPayload = { userId: UserInfo["uid"]; expiresAt: Date };

export async function encrypt(payload: JwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

type DecryptResult =
  | { status: "success"; data: JwtPayload }
  | { status: "error"; error: unknown };

export async function decrypt(
  session: string | undefined = ""
): Promise<DecryptResult> {
  try {
    const { payload } = await jwtVerify<JwtPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return { status: "success", data: payload };
  } catch (error) {
    return { status: "error", error };
  }
}

export async function createSession(userId: UserInfo["uid"]) {
  const expiresAt = new Date(Date.now() + EXPIRE_DURATION);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + EXPIRE_DURATION);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}
