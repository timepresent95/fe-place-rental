import { PostSignupRequestBody } from "@/5.entities/authentication/model";
import { assertValue } from "@/6.shared/lib/assertValue";

interface FormItem {
  accessKey: Extract<keyof PostSignupRequestBody, string>;
  label: string;
  name: string;
  placeholder?: string;
}

export const signupFormItems: FormItem[] = [
  { accessKey: "id", label: "아이디", name: "id" },
  { accessKey: "password", label: "비밀번호", name: "password" },
  { accessKey: "familyName", label: "성", name: "family-name" },
  { accessKey: "firstName", label: "이름", name: "first-name" },
  { accessKey: "email", label: "이메일", name: "email" },
  { accessKey: "phone", label: "전화번호", name: "phone" },
];

export function extractSignupBody(formData: FormData): PostSignupRequestBody {
  return signupFormItems.reduce((acc, cur) => {
    acc[cur.accessKey] = assertValue(
      formData.get(cur.name),
      "올바르지 않은 입력입니다"
    ) as string;
    return acc;
  }, {} as PostSignupRequestBody);
}
