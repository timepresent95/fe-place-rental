import { RENTAL_REVALIDTE_TAG } from "@/5.entities/Rental/api";
import { ApiResult, baseUrl, fetchAPI } from "@/6.shared/lib/api";
import { generateUrl } from "@/6.shared/lib/api/util";

import {
  ApplyGatheringRequestBody,
  ApplyGatheringResponse,
  InvitaionGatheringReqeustParam,
  InvitaionGatheringRequestBody,
  InvitaionGatheringResponse,
  ListGatheringRequestQuery,
  ListGatheringResponse,
  MyGatheringRequestQuery,
  MyGatheringResponse,
} from "./model";

const gatheringBaseURL = baseUrl + "/gathering";
export const apiEndpoint = {
  list: gatheringBaseURL + "/list",
  apply: gatheringBaseURL + "/apply",
  invitaion: gatheringBaseURL + "/:id",
  my: gatheringBaseURL + "/my",
};

const GATHERING_REVALIDTE_TAG = "gathering-list";

export async function getListGathering(
  req: ListGatheringRequestQuery
): Promise<ApiResult<ListGatheringResponse>> {
  const url = new URL(apiEndpoint.list);
  for (const [key, value] of Object.entries(req)) {
    if (value === undefined) {
      continue;
    }
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
    next: {
      tags: [GATHERING_REVALIDTE_TAG, RENTAL_REVALIDTE_TAG],
      revalidate: 5 * 60,
    },
  });
}

export async function invitationGathering(
  id: InvitaionGatheringReqeustParam,
  body: InvitaionGatheringRequestBody
): Promise<ApiResult<InvitaionGatheringResponse>> {
  return fetchAPI(
    generateUrl(apiEndpoint.invitaion, { id }),
    {
      method: "patch",
      body: JSON.stringify(body),
    },
    GATHERING_REVALIDTE_TAG
  );
}

export async function applyGathering(
  body: ApplyGatheringRequestBody
): Promise<ApiResult<ApplyGatheringResponse>> {
  return fetchAPI(
    apiEndpoint.apply,
    {
      method: "post",
      body: JSON.stringify(body),
    },
    GATHERING_REVALIDTE_TAG
  );
}

export async function getMyGathering(
  req: MyGatheringRequestQuery
): Promise<ApiResult<MyGatheringResponse>> {
  const url = new URL(apiEndpoint.my);
  for (const [key, value] of Object.entries(req)) {
    url.searchParams.set(key, value.toString());
  }

  return fetchAPI(url.toString(), {
    method: "get",
    next: { tags: [GATHERING_REVALIDTE_TAG] },
  });
}
