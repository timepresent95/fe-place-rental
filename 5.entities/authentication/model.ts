import { z } from "zod";
import { loginBodyValidation, signupBodyValidation } from "./lib/validation";

export type PostSignupRequestBody = z.infer<typeof signupBodyValidation>;

export type UserInfo = PostSignupRequestBody & {
  uid: string;
};

export type PostSignupResponse = UserInfo;

export type PostLoginRequestBody = z.infer<typeof loginBodyValidation>;

export type PostLoginResponse = UserInfo;

export type GetMyResponse = UserInfo;
