import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import { generateUrl } from "@/6.shared/lib/api/util";

import {
  ListRentalRequestQuery,
  ListRentalResponse,
  MyRentalRequestQuery,
  MyRentalResponse,
  ApplyRentalRequestBody,
  ApplyRentalResponse,
  PatchRentalRequestBody,
  PatchRentalResponse,
  PatchRentalRequestParam,
} from "./model";

const rentalBaseURL = baseUrl + "/rental";
export const apiEndpoint = {
  list: rentalBaseURL + "/list",
  apply: rentalBaseURL + "/apply",
  patch: rentalBaseURL + "/:id",
  my: rentalBaseURL + "/my",
};

export const RENTAL_REVALIDTE_TAG = "rental-list";

export async function getListRental(
  req: ListRentalRequestQuery
): Promise<ApiResult<ListRentalResponse>> {
  const url = new URL(apiEndpoint.list);
  for (const [key, value] of Object.entries(req)) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        url.searchParams.append(key, v);
      });
    } else {
      url.searchParams.set(key, value.toString());
    }
  }

  return fetchAPI(url.toString(), {
    method: "get",
    next: { tags: [RENTAL_REVALIDTE_TAG], revalidate: 5 * 60 },
  });
}

export async function patchReservation(
  id: PatchRentalRequestParam,
  body: PatchRentalRequestBody
): Promise<ApiResult<PatchRentalResponse>> {
  return fetchAPI(
    generateUrl(apiEndpoint.patch, { id }),
    {
      method: "patch",
      body: JSON.stringify(body),
    },
    RENTAL_REVALIDTE_TAG
  );
}
export async function postReservation(
  body: ApplyRentalRequestBody
): Promise<ApiResult<ApplyRentalResponse>> {
  return fetchAPI(
    apiEndpoint.apply,
    {
      method: "post",
      body: JSON.stringify(body),
    },
    RENTAL_REVALIDTE_TAG
  );
}

export async function getMyReservation(
  req: MyRentalRequestQuery
): Promise<ApiResult<MyRentalResponse>> {
  const url = new URL(apiEndpoint.my);
  for (const [key, value] of Object.entries(req)) {
    url.searchParams.set(key, value.toString());
  }

  return fetchAPI(url.toString(), {
    method: "get",
    next: { tags: [RENTAL_REVALIDTE_TAG] },
  });
}
