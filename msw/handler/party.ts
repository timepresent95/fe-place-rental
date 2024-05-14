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
    .sort((first, second) => {
      if (dayjs(first.createdAt).isSame(second.createdAt)) {
        return 0;
      }
      return dayjs(first.createdAt).isAfter(second.createdAt) ? 1 : -1;
    })
    .filter((v) => {
      if (filter.includes("available")) {
        const isOpen = dayjs().isBefore(v.closeAt) && dayjs().isAfter(v.openAt);
        const isApproved = v.requestState === "approved";
        // TODO: paricipant 구현 후 해당 조건도 확인해야 함
        // const isFull =
        return isOpen && isApproved;
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
    total: data.length,
    data: data.slice(offset, offset + pageSize).map((v) => {
      //TODO: 없는 placeId인 경우 에러 반환해야 함
      const place = store.places.get(v.placeId)!;
      const host = store.users.get(v.hostId)!;
      const headcount = Array.from(
        store.participants,
        ([_, value]) => value
      ).filter((value) => v.id === value.partyId).length;

      return {
        partyId: v.id,
        host: {
          id: host.id,
          firstName: host.firstName,
          lastName: host.lastName,
          email: host.email,
          mobileNumber: host.mobileNumber,
        },
        place: {
          name: place.name,
          address: place.address,
          id: place.id,
        },
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
  };
}

const allListApi = http.get(partyEndPoint.allList, ({ request }) => {
  const url = new URL(request.url);

  // query params
  const pageSize = Number(url.searchParams.get("page_size") ?? 10);
  const pageIndex = Number(url.searchParams.get("page_index") ?? 0);
  const sort = (url.searchParams.get("sort") ??
    "created_at") as allList.SortableKey;
  const sortDirection = (url.searchParams.get("sort_direction") ??
    "asc") as allList.SortDirection;
  const filter = url.searchParams.getAll("filter") as allList.Filter[];

  const { total, data } = refineParties(
    Array.from(store.parties, ([_, v]) => v),
    { pageSize, pageIndex, sort, sortDirection, filter }
  );

  return HttpResponse.json<allList.Response>({
    pageSize,
    pageIndex,
    data,
    total,
  });
});

export const partyApi = [allListApi];
