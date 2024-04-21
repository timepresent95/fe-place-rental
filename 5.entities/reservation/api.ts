import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import {
  ListReservationRequestQuery,
  ListReservationResponse,
  MyReservationRequestQuery,
  MyReservationResponse,
  PostReservationRequestBody,
  PostReservationResponse,
} from "./model";

export const apiEndpoint = {
  list: baseUrl + "/reservations",
  post: baseUrl + "/reservation",
  my: baseUrl + "/my/reservation",
};

const RESERVATION_REVALIDTE_TAG = "reservation-list";

export async function getListReservation(
  req: ListReservationRequestQuery
): Promise<ApiResult<ListReservationResponse>> {
  const url = new URL(apiEndpoint.list);
  for (const [key, value] of Object.entries(req)) {
    url.searchParams.set(key, value.toString());
  }

  return fetchAPI(url.toString(), {
    method: "get",
    next: { tags: [RESERVATION_REVALIDTE_TAG], revalidate: 30 },
  });
}

export async function postReservation(
  body: PostReservationRequestBody
): Promise<ApiResult<PostReservationResponse>> {
  return fetchAPI(
    apiEndpoint.post,
    {
      method: "post",
      body: JSON.stringify(body),
    },
    RESERVATION_REVALIDTE_TAG
  );
}

export async function getMyReservation(
  req: MyReservationRequestQuery
): Promise<ApiResult<MyReservationResponse>> {
  const url = new URL(apiEndpoint.my);
  for (const [key, value] of Object.entries(req)) {
    url.searchParams.set(key, value.toString());
  }

  return fetchAPI(url.toString(), {
    method: "get",
    next: { tags: [RESERVATION_REVALIDTE_TAG], revalidate: 30 },
  });
}
