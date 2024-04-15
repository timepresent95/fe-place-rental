import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/reservation/api";
import { Reservation } from "@/5.entities/reservation/model";
import { DEFAULT_PAGE_SIZE } from "@/2.pages/reservationList/lib";

function createMockReservation(): Reservation {
  const capacity = faker.number.int({ min: 3, max: 30 });
  return {
    id: faker.string.uuid(),
    hostName: faker.person.fullName(),
    hostEmail: faker.internet.email(),
    hostPhone: faker.phone.number(),
    attendees: faker.number.int({ max: capacity }),
    capacity,
    groupDescribtion: faker.lorem.paragraph(),
    useDate: faker.date.future(),
    applicationDate: faker.date.recent(),
    isApproved: faker.datatype.boolean(),
  };
}

export default (() => {
  const length = faker.number.int({ min: 11, max: 50 });
  const mockDatas = {
    id: faker.string.uuid(),
    reservations: Array.from({ length }).map(() => createMockReservation()),
  };

  const listAPI = http.get(apiEndpoint.list, ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );

    return HttpResponse.json({
      id: mockDatas.id,
      reservations: mockDatas.reservations.slice(offset, offset + pageSize),
      total: mockDatas.reservations.length,
      pageSize,
      offset,
    });
  });

  return [listAPI];
})();
