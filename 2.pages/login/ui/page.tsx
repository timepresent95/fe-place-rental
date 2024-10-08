"use client";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/6.shared/ui/shardcn/ui/button";
import { Input } from "@/6.shared/ui/shardcn/ui/input";
import { Label } from "@/6.shared/ui/shardcn/ui/label";

import loginAction from "../api/loginAction";

function LoginPage() {
  const [errorMessage, dispatch] = useFormState(loginAction, undefined);
  const router = useRouter();

  return (
    <form className="w-80 mx-auto mt-4" action={dispatch}>
      <div className="space-y-4">
        <div>
          <Label className="font-bold inline-block mb-2" htmlFor="id">
            아이디
          </Label>
          <Input className="h-12" id="id" name="id" />
        </div>
        <div>
          <Label className="font-bold inline-block mb-2" htmlFor="password">
            비밀번호
          </Label>
          <Input
            className="h-12"
            id="password"
            name="password"
            type="password"
          />
        </div>
      </div>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      <LoginButton />
      <a
        className="mt-4 text-slate-400 underline block cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.push("/signup");
        }}>
        혹시 아직 회원이 아니시라면? 무료로 가입해보세요
      </a>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-4" aria-disabled={pending}>
      로그인
    </Button>
  );
}

export default LoginPage;
