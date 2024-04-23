import { z } from "zod";
import { loginBodyValidation, signupBodyValidation } from "./lib/validation";

export type PostSignupRequestBody = z.infer<typeof signupBodyValidation>;

type UserRole = "user" | "admin";

export type UserInfo = PostSignupRequestBody & {
  uid: string;
  role: UserRole;
};

export type PostSignupResponse = UserInfo;

export type PostLoginRequestBody = z.infer<typeof loginBodyValidation>;

export type PostLoginResponse = UserInfo;

export type GetMyResponse = UserInfo;
