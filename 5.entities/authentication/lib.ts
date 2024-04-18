import { z } from "zod";

export const signUpBodyValidation = z.object({
  id: z.string().min(8, "아이디는 8자 이상으로 작성해주세요"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[^\s]{8,}$/,
      "대문자 소문자 숫자 특수문자를 포함하여 8자 이상으로 작성해주세요"
    ),
  firstName: z.string().trim().min(1, "이름을 입력해주세요"),
  familyName: z.string().trim().min(1, "성을 입력해주세요"),
  email: z.string().email("올바른 형식의 메일을 입력해주세요"),
  phone: z
    .string()
    .regex(/010-\d{4}-\d{4}|010\d{8}/, "올바른 형식의 전화번호를 입력해주세요"),
});
