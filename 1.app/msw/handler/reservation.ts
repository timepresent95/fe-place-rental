import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/reservation/api";
import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_QUERY_KEY,
  PAGE_SIZE_QUERY_KEY,
} from "@/2.pages/reservation/ui";
import { Reservation } from "@/5.entities/reservation/model";

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
    console.log(url, url.searchParams.get(PAGINATION_QUERY_KEY));
    const pageIndex = Number(url.searchParams.get(PAGINATION_QUERY_KEY) ?? 1);
    const pageSize = Number(
      url.searchParams.get(PAGE_SIZE_QUERY_KEY) ?? DEFAULT_PAGE_SIZE
    );

    const offset = pageSize * (pageIndex - 1);

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
