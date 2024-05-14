import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { ConfictError } from "../errors";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export const users = new Map<User["id"], User>();

export function createUser(
  payload: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  const id = faker.string.uuid();
  const createdAt = new Date();
  users.set(id, { ...payload, id, createdAt, updatedAt: createdAt });

  return users.get(id) as User;
}

export function createMockUser() {
  const payload = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobileNumber:
      "010" +
      faker.string.numeric({ allowLeadingZeros: false, length: 4 }) +
      faker.string.numeric({ length: 4 }),
  };

  //NOTE: 가짜 유저들은 오늘을 기점으로 3-4년 전에 만들어진것으로 생성
  const user = createUser(payload);
  user.createdAt = faker.date.past({
    refDate: dayjs().subtract(3, "year").toDate(),
  });

  return user;
}
