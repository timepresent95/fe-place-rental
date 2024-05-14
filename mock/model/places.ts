import { faker } from "@faker-js/faker";

import { Account, accounts } from "./accounts";
import { InternalServerError, UnauthorizedError } from "../errors";

export interface Place {
  id: string;
  address: string;
  ownerId: Account["id"];
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export const places = new Map<Place["id"], Place>();

export function createPlace(
  ownerId: Account["id"],
  payload: Pick<Place, "address" | "capacity" | "name">
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

  places.set(id, { ...payload, id, ownerId, createdAt, updatedAt: createdAt });

  return places.get(id) as Place;
}

export function createMockPlace(ownerId: Account["id"]) {
  const owner = accounts.get(ownerId);
  const id = faker.string.uuid();

  if (owner === undefined || places.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  //NOTE: 가짜 장소들은 오늘을 기점으로 2-3년 전에 만들어진것으로 생성
  const createdAt = faker.date.between({
    from: owner.createdAt,
    to: faker.date.future({ refDate: owner.createdAt }),
  });

  const address = [
    faker.location.country(),
    faker.location.state(),
    faker.location.city(),
    faker.location.streetAddress(),
    faker.location.secondaryAddress(),
  ].join(" ");

  const capacity = faker.number.int({ min: 3, max: 100 });
  places.set(id, {
    id,
    ownerId,
    createdAt,
    address,
    capacity,
    name: faker.lorem.word(),
    updatedAt: createdAt,
  });

  return places.get(id) as Place;
}
