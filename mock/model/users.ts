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

export const users = new Map<User["id"], User>();

export function createUser(payload: Omit<User, "id" | "createdAt">) {
  const id = faker.string.uuid();
  const createdAt = new Date();
  users.set(id, { ...payload, id, createdAt });

  return users.get(id) as User;
}

export function createMockUser() {
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone:
      "010" +
      faker.string.numeric({ allowLeadingZeros: false, length: 4 }) +
      faker.string.numeric({ length: 4 }),
  };

  const user = createUser(payload);
  user.createdAt = faker.date.past({ years: 1 });

  return user;
}
