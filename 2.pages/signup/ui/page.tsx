import { Button } from "@/6.shared/ui/shardcn/ui/button";
import { Input } from "@/6.shared/ui/shardcn/ui/input";
import { Label } from "@/6.shared/ui/shardcn/ui/label";

import signupAction from "../api/signupAction";
import { signupFormItems } from "../lib";

//TODO: 아이디 중복 체크 기능 추가
function signupPage() {
  return (
    <main className="container">
      <h1 className="text-center font-extrabold text-2xl">회원 가입</h1>
      <form className="w-80 mx-auto mt-4" action={signupAction}>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-none basis-24">
              <Label
                className="font-bold inline-block mb-2"
                htmlFor="family-name">
                성
              </Label>
              <Input className="h-12" id="family-name" name="family-name" />
            </div>
            <div className="flex-1">
              <Label
                className="font-bold inline-block mb-2"
                htmlFor="first-name">
                이름
              </Label>
              <Input className="h-12" id="first-name" name="first-name" />
            </div>
          </div>
          {signupFormItems.map(({ accessKey, label, name, placeholder }) =>
            accessKey === "firstName" || accessKey === "familyName" ? null : (
              <div key={accessKey}>
                <Label className="font-bold inline-block mb-2" htmlFor={name}>
                  {label}
                </Label>
                <Input
                  className="h-12"
                  id={name}
                  name={name}
                  placeholder={placeholder}
                />
              </div>
            )
          )}
        </div>
        <Button type="submit" className="w-full mt-8">
          가입 하기
        </Button>
      </form>
    </main>
  );
}

signupPage.displayName = "signupPage";

export default signupPage;
