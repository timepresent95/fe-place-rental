"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { UserInfo } from "../model";

const AuthenticationContext = createContext<Partial<UserInfo> | null>(null);

export default function AuthenticationProvider({
  children,
  userInfo,
}: PropsWithChildren<{ userInfo: Partial<UserInfo> }>) {
  return (
    <AuthenticationContext.Provider value={{ ...userInfo }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication(): Partial<UserInfo> {
  const value = useContext(AuthenticationContext);
  if (value === null) {
    throw new Error(
      "useAuthentication은 Authentication Provider 아래에서만 사용 가능합니다."
    );
  }
  return value;
}
