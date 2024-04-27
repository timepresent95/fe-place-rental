import { PostLoginRequestBody } from "@/5.entities/authentication/model";
import { FormInfo } from "@/6.shared/lib/api";
import { assertValue } from "@/6.shared/lib/assertValue";

export const signupFormItems: FormInfo<PostLoginRequestBody>[] = [
  { accessKey: "id", label: "아이디", name: "id" },
  { accessKey: "password", label: "비밀번호", name: "password" },
];

export function extractLoginBody(formData: FormData): PostLoginRequestBody {
  return signupFormItems.reduce((acc, cur) => {
    acc[cur.accessKey] = assertValue(
      formData.get(cur.name),
      "올바르지 않은 입력입니다"
    ) as string;
    return acc;
  }, {} as PostLoginRequestBody);
}
