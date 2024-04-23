import { faker } from "@faker-js/faker";

import {
  PostSignupRequestBody,
  UserInfo,
} from "@/5.entities/authentication/model";
import { Rental } from "@/5.entities/rental/model";

export function createMockUserInfo(payload: PostSignupRequestBody): UserInfo {
  return {
    uid: faker.string.uuid(),
    role: "user",
    ...payload,
  };
}

function getRandomApprovedState() {
  const randomNumber = faker.number.int({ min: 0, max: 2 });
  return (["approved", "rejected", "pending"] as const)[randomNumber];
}

export function createMockReservation(): Rental {
  const capacity = faker.number.int({ min: 3, max: 30 });
  return {
    id: faker.string.uuid(),
    applicantName: faker.person.fullName(),
    contactEmail: faker.internet.email(),
    contactPhone: faker.phone.number(),
    attendees: faker.number.int({ max: capacity }),
    expectedParticipants: capacity,
    purpose: faker.lorem.paragraph(),
    useDate: faker.date.future(),
    applicationDate: faker.date.recent(),
    applicationState: getRandomApprovedState(),
    isPublic: faker.datatype.boolean(),
  };
}
