import { HttpHandler, HttpResponse, http } from "msw";

import { DEFAULT_PAGE_SIZE } from "@/3.widgets/GatheringTable/lib";
import { apiEndpoint } from "@/4.features/Gathering/api";
import { ListGatheringResponse } from "@/4.features/Gathering/model";
import { Rental } from "@/5.entities/Rental/model";
import dayjs from "@/6.shared/lib/dayjs";

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

    const list = store.data.gathering.list.sort((a, b) => {
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

  return [listAPI];
})();
