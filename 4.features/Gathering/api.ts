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
} from "./model";

const gatheringBaseURL = baseUrl + "/gathering";
export const apiEndpoint = {
  list: gatheringBaseURL + "/list",
  apply: gatheringBaseURL + "/apply",
  invitaion: gatheringBaseURL + "/:id",
};

const GATHERING_REVALIDTE_TAG = "gathering-list";

export async function getListGathering(
  req: ListGatheringRequestQuery
): Promise<ApiResult<ListGatheringResponse>> {
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
    next: { tags: [GATHERING_REVALIDTE_TAG], revalidate: 5 * 60 },
  });
}

export async function invitationEvent(
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
export async function applyEvent(
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
