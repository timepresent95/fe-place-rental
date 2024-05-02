import { faker } from "@faker-js/faker";

import { Account, accounts } from "./accounts";
import { Place, places } from "./places";
import { InternalServerError, NotFoundError } from "../errors";

type PartyPermission = "approved" | "rejected" | "pending";

interface Party {
  id: string;
  hostId: Account["id"];
  placeId: Place["id"];
  description: string;
  capacity: number;
  partyAt: Date;
  permission: PartyPermission;
  createdAt: Date;
}

export const parties = new Map<string, Party>();

export function createParty(
  hostId: Account["id"],
  placeId: Place["id"],
  payload: Pick<Party, "description" | "capacity" | "partyAt">
) {
  const host = accounts.get(hostId);
  if (host === undefined) {
    throw new NotFoundError("유저 정보가 존재하지 않습니다");
  }

  const place = places.get(placeId);
  if (place === undefined) {
    throw new NotFoundError("존재하지 않는 장소입니다.");
  }

  const id = faker.string.uuid();
  if (parties.has(id)) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const createdAt = new Date();

  parties.set(id, {
    id,
    hostId: host.id,
    placeId: place.id,
    ...payload,
    permission: "pending",
    createdAt,
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

  const party = createParty(hostId, placeId, {
    description: faker.lorem.paragraphs(),
    capacity: faker.number.int({ min: 2, max: place.capacity - 1 }),
    partyAt: faker.date.between({
      from: faker.date.recent(),
      to: faker.date.soon(),
    }),
  });
  party.createdAt = faker.date.between({
    from: place.createdAt,
    to: faker.date.recent({ days: 31 }),
  });

  return party;
}
