import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { UserInfo } from "@/5.entities/authentication/model";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const EXPIRE_DURATION = 7 * 24 * 60 * 60 * 1000;

//TODO: registered claims 적용해야 함
type JwtPayload = { uid: UserInfo["uid"]; expiresAt: Date };

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

export async function createToken(userId: UserInfo["uid"]) {
  const expiresAt = new Date(Date.now() + EXPIRE_DURATION);
  return await encrypt({ uid: userId, expiresAt });
}
