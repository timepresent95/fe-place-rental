import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/reservation/api";
import {
  ListReservationResponse,
  PostReservationRequestBody,
  PostReservationResponse,
  Reservation,
} from "@/5.entities/reservation/model";
import { DEFAULT_PAGE_SIZE } from "@/2.pages/reservationList/lib";

function createMockReservation(): Reservation {
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
    isApproved: faker.datatype.boolean(),
    isPublic: faker.datatype.boolean(),
  };
}

export default ((): HttpHandler[] => {
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

    return HttpResponse.json<ListReservationResponse>({
      id: mockDatas.id,
      reservations: mockDatas.reservations.slice(offset, offset + pageSize),
      total: mockDatas.reservations.length,
      pageSize,
      offset,
    });
  });

  const postAPI = http.post(apiEndpoint.post, async ({ request }) => {
    const body = (await request.json()) as PostReservationRequestBody;
    const newReservation: PostReservationResponse = {
      ...body,
      id: faker.string.uuid(),
      attendees: 1,
      applicationDate: new Date(),
      isApproved: false,
    };
    mockDatas.reservations.push(newReservation);
    return HttpResponse.json<PostReservationResponse>(newReservation);
  });

  return [postAPI, listAPI];
})();
