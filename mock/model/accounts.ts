import { faker } from "@faker-js/faker";

import { User, createUser } from "./users";
import { ConfictError, InternalServerError } from "../errors";

export interface Account {
  email: string;
  password: string;
  role: string;
  userId: string;
  createdAt: Date;
}

export const accounts = new Map<string, Account>();

export function createAccount(
  payload: Pick<Account, "password"> & Omit<User, "id" | "createdAt">
) {
  if (accounts.has(payload.email)) {
    throw new ConfictError("이미 계정이 존재하는 email입니다.");
  }

  const user = createUser({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
  });

  accounts.set(user.email, {
    email: user.email,
    password: payload.password,
    role: "user",
    createdAt: user.createdAt,
    userId: user.id,
  });

  return accounts.get(payload.email) as Account;
}

export function createMockAccount(mockUser: User) {
  if (accounts.has(mockUser.email)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  accounts.set(mockUser.email, {
    email: mockUser.email,
    password: faker.internet.password(),
    role: "user",
    createdAt: mockUser.createdAt,
    userId: mockUser.id,
  });

  return accounts.get(mockUser.email) as Account;
}
