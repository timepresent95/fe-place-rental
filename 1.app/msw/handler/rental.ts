import { faker } from "@faker-js/faker";
import { HttpHandler, HttpResponse, http } from "msw";

import { DEFAULT_PAGE_SIZE } from "@/2.pages/rental/list/lib";
import { apiEndpoint } from "@/5.entities/Rental/api";
import {
  ListRentalResponse,
  ApplyRentalRequestBody,
  ApplyRentalResponse,
  PatchRentalRequestBody,
  PatchRentalResponse,
  Rental,
} from "@/5.entities/Rental/model";
import dayjs from "@/6.shared/lib/dayjs";

import { extractUid } from "./util";
import {
  badRequestWrongTokenResponse,
  forbiddenUnAuthenticatedResponse,
  notFoundDataResponse,
  unauthenticatedUnauthroizedResponse,
} from "../lib/DetailErrorResponse";
import CustomStore from "../lib/store";

export default ((): HttpHandler[] => {
  const store = CustomStore.getInstance();

  const listAPI = http.get(apiEndpoint.list, ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );
    const sort = (url.searchParams.get("sort") ??
      "applicationDate") as keyof Rental;
    const sortDirection =
      url.searchParams.get("sortDirection") === "desc" ? -1 : 1;

    const list = store.data.rental.list
      .filter((v) => {
        const applicationStateCondition =
          url.searchParams.getAll("applicationState");
        if (applicationStateCondition.length === 0) {
          return true;
        }
        return applicationStateCondition.includes(v.applicationState);
      })
      .sort((a, b) => {
        if (dayjs(a[sort] as Date).isSame(dayjs(b[sort] as Date))) {
          return 0;
        }
        return dayjs(a[sort] as Date).isAfter(dayjs(b[sort] as Date))
          ? 1 * sortDirection
          : -1 * sortDirection;
      });
    return HttpResponse.json<ListRentalResponse>({
      id: store.data.rental.id,
      list: list.slice(offset, offset + pageSize),
      total: list.length,
      pageSize,
      offset,
    });
  });

  const postAPI = http.post(apiEndpoint.apply, async ({ request }) => {
    const extractResult = await extractUid(request);
    const hostId =
      extractResult.status === "success" ? extractResult.data.uid : undefined;
    const body = (await request.json()) as ApplyRentalRequestBody;
    const newReservation: ApplyRentalResponse = {
      ...body,
      id: faker.string.uuid(),
      applicationDate: new Date(),
      applicationState: "pending",
      hostId,
    };
    store.data.rental.list.push(newReservation);
    store.data.rental.total++;
    return HttpResponse.json<ApplyRentalResponse>(newReservation);
  });

  const patchAPI = http.patch(
    apiEndpoint.patch,
    async ({ request, params }) => {
      const extractResult = await extractUid(request);
      const uid =
        extractResult.status === "success" ? extractResult.data.uid : undefined;

      const body = (await request.json()) as PatchRentalRequestBody;

      if (body.applicationState !== undefined) {
        if (!uid) {
          return badRequestWrongTokenResponse();
        }
        if (
          !store.data.user.find((v) => v.uid === uid && v.authority === "admin")
        ) {
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
    const hostId =
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
      .filter((v) => v.hostId === hostId)
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
