import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { Account, accounts } from "./accounts";
import { Place, places } from "./places";
import { ConfictError, InternalServerError, NotFoundError } from "../errors";
import { RequestState, getRandomRequestState } from "../lib";

export interface Party {
  id: string;
  hostId: Account["id"];
  title: string;
  placeId: Place["id"];
  description: string;
  capacity: number;
  partyAt: Date;
  openAt: Date;
  closeAt: Date;
  requestState: RequestState;
  createdAt: Date;
  updatedAt: Date;
}

export const parties = new Map<string, Party>();

export const partyDates = new Set<number>();

export function createParty(
  hostId: Account["id"],
  placeId: Place["id"],
  payload: Pick<Party, "description" | "capacity" | "partyAt" | "title">
) {
  const host = accounts.get(hostId);
  if (host === undefined) {
    throw new NotFoundError("유저 정보가 존재하지 않습니다");
  }

  const place = places.get(placeId);
  if (place === undefined) {
    throw new NotFoundError("존재하지 않는 장소입니다.");
  }

  const partyAt = payload.partyAt;
  if (partyDates.has(partyAt.valueOf())) {
    throw new ConfictError("예약할수 없는 날짜입니다.");
  }

  const id = faker.string.uuid();
  if (parties.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const createdAt = new Date();
  const openAt = createdAt;
  const closeAt = faker.date.between({ from: openAt, to: payload.partyAt });

  parties.set(id, {
    id,
    hostId: host.id,
    placeId: place.id,
    ...payload,
    requestState: "pending",
    openAt,
    closeAt,
    createdAt,
    updatedAt: createdAt,
  });

  return parties.get(id) as Party;
}

export function createMockParty(hostId: Account["id"], placeId: Place["id"]) {
  const host = accounts.get(hostId);
  const place = places.get(placeId);

  if (host === undefined || place === undefined) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const id = faker.string.uuid();
  if (parties.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  //NOTE: 가짜 장소들은 오늘을 기점으로 2-3년 전 ~ 31일 전에 만들어진것으로 생성
  const createdAt = faker.date.between({
    from: place.createdAt,
    to: faker.date.recent({ days: 31 }),
  });

  const partyAt = faker.date.between({
    from: dayjs(createdAt).add(30, "day").toDate(),
    to: dayjs(createdAt).add(90, "day").toDate(),
  });
  const openAt = faker.date.between({
    from: dayjs(createdAt).add(1, "day").toDate(),
    to: dayjs(partyAt).subtract(10, "day").toDate(),
  });
  const closeAt = faker.date.between({
    from: dayjs(openAt).add(3, "day").toDate(),
    to: partyAt,
  });
  const requestState = partyDates.has(partyAt.valueOf())
    ? "rejected"
    : getRandomRequestState();

  parties.set(id, {
    id,
    hostId: host.id,
    placeId: place.id,
    description: faker.lorem.paragraphs(),
    title: faker.lorem.sentence({ min: 3, max: 5 }),
    capacity: faker.number.int({ min: 2, max: place.capacity - 1 }),
    partyAt,
    requestState,
    openAt,
    closeAt,
    createdAt,
    updatedAt: faker.date.soon({ refDate: createdAt }),
  });

  return parties.get(id) as Party;
}
