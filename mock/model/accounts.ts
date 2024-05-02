import { faker } from "@faker-js/faker";

import { User, createMockUser, createUser } from "./users";
import { InternalServerError } from "../errors";

export interface Account {
  id: User["id"];
  password: string;
  role: string;
  createdAt: Date;
}

export const accounts = new Map<Account["id"], Account>();

export function createAccount(
  payload: Pick<Account, "password"> & Omit<User, "id" | "createdAt">
) {
  const user = createUser({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
  });

  accounts.set(user.id, {
    id: user.id,
    password: payload.password,
    role: "user",
    createdAt: user.createdAt,
  });

  return accounts.get(user.id) as Account;
}

export function createMockAccount() {
  const user = createMockUser();

  if (accounts.has(user.id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  accounts.set(user.id, {
    id: user.id,
    password: faker.internet.password(),
    role: "user",
    createdAt: user.createdAt,
  });

  return accounts.get(user.id) as Account;
}
