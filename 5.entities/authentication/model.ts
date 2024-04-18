import { z } from "zod";
import { signUpBodyValidation } from "./lib";

export type PostSignupRequestBody = z.infer<typeof signUpBodyValidation>;

export type UserInfo = PostSignupRequestBody & {
  uid: string;
};

export type PostSignupResponse = UserInfo;
