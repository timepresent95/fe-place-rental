import { PropsWithChildren } from "react";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className="container">
      <h1 className="text-center font-extrabold text-2xl">로그인</h1>
      {children}
    </main>
  );
}
