import { HttpHandler, HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

import { extractUid } from "./util";
import {
  badRequestWrongTokenResponse,
  forbiddenUnAuthenticatedResponse,
  notFoundDataResponse,
  unauthenticatedUnauthroizedResponse,
} from "../lib/DetailErrorResponse";

import { DEFAULT_PAGE_SIZE } from "@/2.pages/rental/list/lib";
import { apiEndpoint } from "@/5.entities/rental/api";
import {
  ListRentalResponse,
  ApplyRentalRequestBody,
  ApplyRentalResponse,
  PatchRentalRequestBody,
  PatchRentalResponse,
} from "@/5.entities/rental/model";
import CustomStore from "../lib/store";

export default ((): HttpHandler[] => {
  const store = CustomStore.getInstance();

  const listAPI = http.get(apiEndpoint.list, ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );

    return HttpResponse.json<ListRentalResponse>({
      id: store.data.rental.id,
      list: store.data.rental.list.slice(offset, offset + pageSize),
      total: store.data.rental.total,
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
    store.data.rental.list.push(newReservation);
    store.data.rental.total++;
    return HttpResponse.json<ApplyRentalResponse>(newReservation);
  });

  const patchAPI = http.patch(
    apiEndpoint.patch,
    async ({ request, params }) => {
      const extractResult = await extractUid(request);
      //TODO: 권한 확인해야함
      const uid =
        extractResult.status === "success" ? extractResult.data.uid : undefined;

      const body = (await request.json()) as PatchRentalRequestBody;

      if (body.applicationState !== undefined) {
        if (!uid) {
          return badRequestWrongTokenResponse();
        }
        if (!store.data.user.find((v) => v.uid === uid && v.role === "admin")) {
          return unauthenticatedUnauthroizedResponse();
        }
      }

      const { id } = params;
      const targetIndex = store.data.rental.list.findIndex(
        (rental) => rental.id === id
      );

      if (targetIndex < 0) {
        return notFoundDataResponse();
      }

      store.data.rental.list[targetIndex] = {
        ...store.data.rental.list[targetIndex],
        ...body,
      };

      return HttpResponse.json<PatchRentalResponse>(
        store.data.rental.list[targetIndex]
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
    const reservations = store.data.rental.list
      .filter((v) => v.applicantId === applicantId)
      .slice(offset, offset + pageSize);
    return HttpResponse.json<ListRentalResponse>({
      id: store.data.rental.id,
      list: reservations,
      total: reservations.length,
      pageSize,
      offset,
    });
  });

  return [postAPI, listAPI, myAPI, patchAPI];
})();
