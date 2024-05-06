import dayjs from "dayjs";
import { HttpResponse, http } from "msw";

import * as allList from "@/api/party/allList";
import { partyEndPoint } from "@/api/party/index";
import { store } from "@/mock/model";
import { Party } from "@/mock/model/parties";
import { convertKebabToCamel } from "@/util/string";
import { NonOptional } from "@/util/utilityType";

function refineParties(
  source: Party[],
  {
    pageSize,
    pageIndex,
    sort,
    sortDirection,
    filter,
  }: NonOptional<allList.Request["query"]>
) {
  const offset = pageIndex * pageSize;
  const data = source
    .filter((v) => {
      if (filter.includes("available")) {
        const isOpen = dayjs().isBefore(v.closeAt) && dayjs().isAfter(v.openAt);
        // TODO: paricipant 구현 후 해당 조건도 확인해야 함
        // const isFull =
        return isOpen;
      }
      return true;
    })
    .sort((first, second) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      const sortKey = convertKebabToCamel(sort) as keyof Party;
      if (dayjs(first[sortKey]).isSame(second[sortKey])) {
        return 0;
      }
      return dayjs(first[sortKey]).isAfter(second[sortKey])
        ? direction
        : direction * -1;
    });

  return {
    data: data.slice(offset, offset + pageSize).map((v) => {
      //TODO: 없는 placeId인 경우 에러 반환해야 함
      const place = store.places.get(v.placeId)!;
      const headcount = Array.from(
        store.participants,
        ([_, value]) => value
      ).filter((value) => v.id === value.partyId).length;

      return {
        partyId: v.id,
        hostId: v.hostId,
        placeName: place.name,
        placeAddress: place.address,
        placeId: v.placeId,
        description: v.description,
        capacity: v.capacity,
        headcount,
        requestState: v.requestState,
        openAt: v.openAt,
        closeAt: v.closeAt,
        partyAt: v.partyAt,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
      };
    }),
    isEnd: data.length >= offset + pageSize,
  };
}

const allListApi = http.get(partyEndPoint.allList, ({ request }) => {
  const url = new URL(request.url);

  // query params
  const pageSize = Number(url.searchParams.get("page-size") ?? 10);
  const pageIndex = Number(url.searchParams.get("page-index") ?? 0);
  const sort = (url.searchParams.get("sort") ??
    "created-at") as allList.SortableKey;
  const sortDirection = (url.searchParams.get("sort-direction") ??
    "asc") as allList.SortDirection;
  const filter = url.searchParams.getAll("sort-direction") as allList.Filter[];

  const parties = refineParties(
    Array.from(store.parties, ([_, v]) => v),
    { pageSize, pageIndex, sort, sortDirection, filter }
  );

  return HttpResponse.json<allList.Response>({
    pageSize,
    pageIndex,
    data: parties.data,
    isEnd: parties.isEnd,
  });
});

export const partyApi = [allListApi];
