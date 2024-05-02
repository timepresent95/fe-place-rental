import { faker } from "@faker-js/faker";

import { ConfictError } from "../errors";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const user = new Map<string, User>();

export function createUser(payload: Omit<User, "id" | "createdAt">) {
  const id = faker.string.uuid();
  const createdAt = new Date();
  user.set(id, { ...payload, id, createdAt });

  return user.get(id) as User;
}

export function createMockUser() {
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number("010-####-####"),
  };
  return createUser(payload);
}
