import { faker } from "@faker-js/faker";

import { Account, accounts } from "./accounts";
import { User } from "./users";
import { InternalServerError, UnauthorizedError } from "../errors";

export interface Place {
  id: string;
  address: string;
  ownerId: User["id"];
  capacity: number;
  createdAt: Date;
}

export const places = new Map<Place["id"], Place>();

export function createPlace(
  ownerId: Account["userId"],
  payload: Pick<Place, "address" | "capacity">
) {
  const owner = accounts.get(ownerId);
  if (owner === undefined) {
    throw new UnauthorizedError("존재하지 않는 계정입니다.");
  }

  const id = faker.string.uuid();
  if (places.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const createdAt = new Date();

  places.set(id, { ...payload, id, ownerId, createdAt });

  return places.get(id) as Place;
}

export function createMockPlace(ownerId: Account["userId"]) {
  const owner = accounts.get(ownerId);
  const id = faker.string.uuid();

  if (owner === undefined || places.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const createdAt = faker.date.between({
    from: owner.createdAt,
    to: faker.date.past({ years: 1 }),
  });
  const address = [
    faker.location.country(),
    faker.location.state(),
    faker.location.city(),
    faker.location.streetAddress(),
    faker.location.secondaryAddress(),
  ].join(" ");

  places.set(id, {
    id,
    ownerId,
    createdAt,
    address,
    capacity: faker.number.int({ min: 3, max: 100 }),
  });

  return places.get(id) as Place;
}
