import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import { ListReservationRequestParams, ListReservationResponse } from "./model";

export const apiEndpoint = {
  list: baseUrl + "/reservations",
};

export async function getListReservation(
  req: ListReservationRequestParams
): Promise<ApiResult<ListReservationResponse>> {
  const url = new URL(apiEndpoint.list);
  for (const [key, value] of Object.entries(req)) {
    url.searchParams.set(key, value.toString());
  }

  return fetchAPI(url.toString(), { method: "get" });
}
