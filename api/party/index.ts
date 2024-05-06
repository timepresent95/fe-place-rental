import { ensureExists } from "@/util/\btypeSafety";
import { createUrl } from "@/util/url";

import * as allList from "./allList";
import { fetchAction } from "../lib";

const BASE_URL = ensureExists(
  process.env.NEXT_PUBLIC_API_URL,
  "api base url is not defined"
);

const END_POINT = BASE_URL + "/party";

export const partyEndPoint = {
  allList: END_POINT,
};

export async function getAllListParty({ query }: allList.Request) {
  return fetchAction<allList.Response>(
    createUrl(partyEndPoint.allList, { query })
  );
}
