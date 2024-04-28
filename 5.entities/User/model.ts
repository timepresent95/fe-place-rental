import { z } from "zod";

import { RouteAuthority } from "@/6.shared/Router/model";

import { loginBodyValidation, signupBodyValidation } from "./lib/validation";

export type PostSignupRequestBody = z.infer<typeof signupBodyValidation>;

export type User = PostSignupRequestBody & {
  uid: string;
  authority: RouteAuthority;
};

export type PostSignupResponse = User;

export type PostLoginRequestBody = z.infer<typeof loginBodyValidation>;

export type PostLoginResponse = User;

export type GetMyResponse = User;
