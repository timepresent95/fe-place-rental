import { HttpHandler, HttpResponse, http } from "msw";

import { DEFAULT_PAGE_SIZE } from "@/3.widgets/GatheringTable/lib";
import { apiEndpoint } from "@/4.features/Gathering/api";
import {
  ApplyGatheringRequestBody,
  ApplyGatheringResponse,
  InvitaionGatheringRequestBody,
  InvitaionGatheringResponse,
  ListGatheringResponse,
  MyGatheringResponse,
} from "@/4.features/Gathering/model";
import { Rental } from "@/5.entities/Rental/model";
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
    const list = store.data.gathering.list
      .filter((v) => {
        const availableFilter = url.searchParams.get("available");
        if (availableFilter === null || availableFilter === "false") {
          return true;
        } else {
          return (
            dayjs(v.useDate).isAfter(dayjs()) &&
            v.expectedParticipants > v.attendees.length
          );
        }
      })
      .sort((a, b) => {
        if (dayjs(a[sort] as Date).isSame(dayjs(b[sort] as Date))) {
          return 0;
        }
        return dayjs(a[sort] as Date).isAfter(dayjs(b[sort] as Date))
          ? 1 * sortDirection
          : -1 * sortDirection;
      });
    return HttpResponse.json<ListGatheringResponse>({
      id: store.data.rental.id,
      list: list.slice(offset, offset + pageSize),
      total: list.length,
      pageSize,
      offset,
    });
  });

  const applyAPI = http.post(apiEndpoint.apply, async ({ request }) => {
    const extractResult = await extractUid(request);
    const userId =
      extractResult.status === "success" ? extractResult.data.uid : undefined;
    if (!userId) {
      return badRequestWrongTokenResponse();
    }
    const { rentalId } = (await request.json()) as ApplyGatheringRequestBody;
    const targetIndex = store.data.gathering.list.findIndex(
      (v) => v.id === rentalId
    );
    const targetUser = store.data.user.find((v) => v.uid === userId);
    if (targetIndex === undefined) {
      return notFoundDataResponse();
    }

    if (targetUser === undefined) {
      return forbiddenUnAuthenticatedResponse();
    }
    store.data.gathering.list[targetIndex].applicants.push({
      ...targetUser,
      applicationState: "pending",
    });

    return HttpResponse.json<ApplyGatheringResponse>({ rentalId });
  });

  const invitaionAPI = http.patch(
    apiEndpoint.invitaion,
    async ({ request, params }) => {
      const id = params.id as string;

      const targetIndex = store.data.gathering.list.findIndex(
        (v) => v.id === id
      );
      if (targetIndex === undefined) {
        return notFoundDataResponse();
      }

      const extractResult = await extractUid(request);
      const uid =
        extractResult.status === "success" ? extractResult.data.uid : undefined;
      if (!uid) {
        return badRequestWrongTokenResponse();
      }

      if (store.data.gathering.list[targetIndex].hostId !== uid) {
        return unauthenticatedUnauthroizedResponse();
      }

      const { applicationState } =
        (await request.json()) as InvitaionGatheringRequestBody;

      const targetApplicantIndex = store.data.gathering.list[
        targetIndex
      ].applicants.findIndex((v) => v.uid === uid);

      if (targetApplicantIndex === undefined) {
        return notFoundDataResponse();
      }

      store.data.gathering.list[targetIndex].applicants[targetApplicantIndex] =
        {
          ...store.data.gathering.list[targetIndex].applicants[
            targetApplicantIndex
          ],
          applicationState,
        };
      return HttpResponse.json<InvitaionGatheringResponse>({ rentalId: id });
    }
  );

  const myAPI = http.get(apiEndpoint.my, async ({ request }) => {
    const extractResult = await extractUid(request);

    if (extractResult.status === "error") {
      return forbiddenUnAuthenticatedResponse();
    }

    const uid = extractResult.data.uid;

    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? 1);
    const pageSize = Number(
      url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
    );

    const reservations = store.data.gathering.list
      .filter((v) => v.hostId === uid)
      .slice(offset, offset + pageSize);

    return HttpResponse.json<MyGatheringResponse>({
      id: store.data.rental.id,
      list: reservations,
      total: reservations.length,
      pageSize,
      offset,
    });
  });

  return [listAPI, applyAPI, invitaionAPI, myAPI];
})();
