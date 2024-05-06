import { faker } from "@faker-js/faker";

import { Party, parties } from "./parties";
import { User, users } from "./users";
import { InternalServerError, NotFoundError } from "../errors";
import { RequestState, getRandomRequestState } from "../lib";

export interface Participant {
  userId: User["id"];
  partyId: Party["id"];
  requestState: RequestState;
  createdAt: Date;
  updatedAt: Date;
}

//NOTE: participants의 id는 {userId}-{partyId}로 구성
export const participants = new Map<string, Participant>();

export function createParticipant(userId: User["id"], partyId: Party["id"]) {
  const user = users.get(userId);
  if (user === undefined) {
    throw new NotFoundError("유저 정보가 존재하지 않습니다");
  }

  const party = parties.get(partyId);
  if (party === undefined) {
    throw new NotFoundError("존재하지 않는 행사입니다.");
  }

  const createdAt = new Date();
  const id = `${userId}-${partyId}`;
  participants.set(id, {
    userId,
    partyId,
    requestState: "pending",
    createdAt,
    updatedAt: createdAt,
  });

  return participants.get(id) as Participant;
}

export function createMockParticipant(
  userId: User["id"],
  partyId: Party["id"]
) {
  const user = users.get(userId);
  const party = parties.get(partyId);

  if (user === undefined || party === undefined) {
    throw new InternalServerError(
      "mock 데이터를 생성하는 과정에서 오류가 발생했습니다."
    );
  }

  const participants = createParticipant(userId, partyId);
  participants.requestState = getRandomRequestState();
  participants.createdAt = faker.date.soon({ refDate: party.createdAt });
  participants.updatedAt = faker.date.soon({ refDate: participants.createdAt });

  return participants;
}
