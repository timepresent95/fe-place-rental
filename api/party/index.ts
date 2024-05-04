import { createUrl } from "@/util/url";

import * as allList from "./allList";
import { fetchAction } from "../lib";

const END_POINT = "/party";

export const partyEndPoint = {
  allList: END_POINT,
};

export async function getAllListParty({ query }: allList.Request) {
  return fetchAction<allList.Response>(
    createUrl(partyEndPoint.allList, { query })
  );
}
