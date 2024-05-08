import { getRandom } from "@/util/math";

import { accounts, createMockAccount } from "./accounts";
import {
  Participant,
  createMockParticipant,
  participants,
} from "./participants";
import { Party, createMockParty, parties } from "./parties";
import { createMockPlace, places } from "./places";
import { createMockUser, users } from "./users";

function setInit() {
  const mockGuests = Array.from({
    length: getRandom({ min: 10, max: 20 }),
  }).map(() => createMockUser());

  const mockMembers = Array.from({
    length: getRandom({ min: 10, max: 20 }),
  }).map(() => createMockAccount());

  const mockPlaces = Array.from({
    length: getRandom({ min: 10, max: 20 }),
  }).map(() => {
    const ownerId = mockMembers[getRandom({ max: mockMembers.length - 1 })].id;

    return createMockPlace(ownerId);
  });

  let mockApprovedPartyNumber = 20;
  const mockPartyNumber = getRandom({ min: 100, max: 200 });
  const mockParties: Party[] = [];
  const mockApprovedParty: Party[] = [];

  while (
    mockApprovedPartyNumber > mockApprovedParty.length ||
    mockParties.length < mockPartyNumber
  ) {
    const hostId = mockMembers[getRandom({ max: mockMembers.length - 1 })].id;
    const placeId = mockPlaces[getRandom({ max: mockPlaces.length - 1 })].id;

    const mockParty = createMockParty(hostId, placeId);
    if (mockParty.requestState === "approved") {
      mockApprovedParty.push(mockParty);
    }
    mockParties.push(mockParty);
  }

  //mockParticipants
  mockApprovedParty.flatMap(({ id: partyId }) => {
    const ret: Participant[] = [];

    const userIdSet = new Set([
      ...Array.from({
        length: getRandom({ min: 10, max: 20 }),
      }).map(() => mockMembers[getRandom({ max: mockMembers.length - 1 })].id),
      ...Array.from({
        length: getRandom({ min: 10, max: 20 }),
      }).map(() => mockGuests[getRandom({ max: mockGuests.length - 1 })].id),
    ]);

    userIdSet.forEach((userId) =>
      ret.push(createMockParticipant(userId, partyId))
    );

    return ret;
  });
}

setInit();
export const store = {
  accounts,
  participants,
  parties,
  places,
  users,
};
