import { DefaultBodyType, StrictRequest } from "msw";
import { decrypt } from "../lib/token";

export async function extractUid(request: StrictRequest<DefaultBodyType>) {
  const token = request.headers.get("x-auth-token");
  return decrypt(token ?? "");
}
