import { User, createUser } from "./users";
import { ConfictError } from "../errors";

interface Account {
  email: string;
  password: string;
  role: string;
  userId: string;
  createdAt: Date;
}

const accounts = new Map<string, Account>();

export function createAccount(
  payload: Pick<Account, "password"> & Omit<User, "id" | "createdAt">
) {
  if (accounts.has(payload.email)) {
    throw new ConfictError("이미 존재하는 email입니다.");
  }

  const user = createUser({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
  });

  accounts.set(payload.email, {
    email: user.email,
    password: payload.password,
    role: "user",
    createdAt: user.createdAt,
    userId: user.id,
  });

  return accounts.get(payload.email) as Account;
}
