"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { User } from "../model";

const UserContext = createContext<
  (Partial<User> & Pick<User, "authority">) | null
>(null);

export default function UserProvider({
  children,
  userInfo,
}: PropsWithChildren<{ userInfo: Partial<User> & Pick<User, "authority"> }>) {
  return (
    <UserContext.Provider value={{ ...userInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): Partial<User> & Pick<User, "authority"> {
  const value = useContext(UserContext);
  if (value === null) {
    throw new Error(
      "useAuthentication은 Authentication Provider 아래에서만 사용 가능합니다."
    );
  }
  return value;
}
