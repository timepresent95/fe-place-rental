import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { apiEndpoint } from "@/5.entities/rental/api";
import {
  ListRentalResponse,
  ApplyRentalRequestBody,
  ApplyRentalResponse,
  Rental,
  PatchRentalRequestBody,
  PatchRentalResponse,
} from "@/5.entities/rental/model";
import { DEFAULT_PAGE_SIZE } from "@/2.pages/rental/list/lib";
import { extractUid } from "./util";
import {
  forbiddenUnAuthenticatedResponse,
  notFoundDataResponse,
} from "../lib/DetailErrorResponse";

function getRandomApprovedState() {
  const randomNumber = faker.number.int({ min: 0, max: 2 });
  return (["approved", "rejected", "pending"] as const)[randomNumber];
}

function createMockReservation(): Rental {
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

export default ((): HttpHandler[] => {
  const length = faker.number.int({ min: 11, max: 50 });
  const mockDatas = {
    id: faker.string.uuid(),
    rentals: Array.from({ length }).map(() => createMockReservation()),
    total: length,
  };

  const listAPI = http.get(apiEndpoint.list, ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );

    return HttpResponse.json<ListRentalResponse>({
      id: mockDatas.id,
      rentals: mockDatas.rentals.slice(offset, offset + pageSize),
      total: mockDatas.total,
      pageSize,
      offset,
    });
  });

  const postAPI = http.post(apiEndpoint.apply, async ({ request }) => {
    const extractResult = await extractUid(request);
    const applicantId =
      extractResult.status === "success" ? extractResult.data.uid : undefined;
    const body = (await request.json()) as ApplyRentalRequestBody;
    const newReservation: ApplyRentalResponse = {
      ...body,
      id: faker.string.uuid(),
      attendees: 1,
      applicationDate: new Date(),
      applicationState: "pending",
      applicantId,
    };
    mockDatas.rentals.push(newReservation);
    mockDatas.total++;
    return HttpResponse.json<ApplyRentalResponse>(newReservation);
  });

  const patchAPI = http.patch(
    apiEndpoint.patch,
    async ({ request, params }) => {
      const extractResult = await extractUid(request);
      //TODO: 권한 확인해야함
      const applicantId =
        extractResult.status === "success" ? extractResult.data.uid : undefined;

      const body = (await request.json()) as PatchRentalRequestBody;

      const { id } = params;
      const targetIndex = mockDatas.rentals.findIndex(
        (rental) => rental.id === id
      );

      if (targetIndex < 0) {
        return notFoundDataResponse();
      }

      mockDatas.rentals[targetIndex] = {
        ...mockDatas.rentals[targetIndex],
        ...body,
      };

      return HttpResponse.json<PatchRentalResponse>(
        mockDatas.rentals[targetIndex]
      );
    }
  );

  const myAPI = http.get(apiEndpoint.my, async ({ request }) => {
    const extractResult = await extractUid(request);
    const applicantId =
      extractResult.status === "success" ? extractResult.data.uid : undefined;

    if (extractResult.status === "error") {
      return forbiddenUnAuthenticatedResponse();
    }

    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );
    const reservations = mockDatas.rentals
      .filter((v) => v.applicantId === applicantId)
      .slice(offset, offset + pageSize);
    return HttpResponse.json<ListRentalResponse>({
      id: mockDatas.id,
      rentals: reservations,
      total: reservations.length,
      pageSize,
      offset,
    });
  });

  return [postAPI, listAPI, myAPI, patchAPI];
})();
