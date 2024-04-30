import { Suspense } from "react";

import { redirect } from "next/navigation";

import EventTable from "@/3.widgets/GatheringTable/ui";
import GatheringFilters from "@/3.widgets/RentalFilters/ui";
import { TableViewSkeleton } from "@/4.features/TableView/ui";

import {
  AVAILABLE_FILTER_QUERY_KEY,
  DEFAULT_PAGE_SIZE,
  PAGINATION_QUERY_KEY,
  Props,
  createRedirectUrl,
  extractQuery,
} from "../lib";

function GatheringListPage({ searchParams }: Props) {
  const { availableFilter, pagination, pageSize, offset } =
    extractQuery(searchParams);

  if (
    pagination === undefined ||
    pageSize === undefined ||
    offset === undefined
  ) {
    redirect(createRedirectUrl(1, DEFAULT_PAGE_SIZE, availableFilter));
  }

  return (
    <div className=" container">
      <div className="flex items-center">
        <GatheringFilters
          paginationQueryKey={PAGINATION_QUERY_KEY}
          filterQueryKey={AVAILABLE_FILTER_QUERY_KEY}
        />
      </div>
      <Suspense
        fallback={<TableViewSkeleton />}
        key={`${pageSize}-${offset}-${availableFilter}`}>
        <EventTable
          pageSize={pageSize}
          offset={offset}
          availableFilter={availableFilter}
          paginationQueryKey={PAGINATION_QUERY_KEY}
        />
      </Suspense>
    </div>
  );
}

GatheringListPage.displayName = "GatheringListPage";

export default GatheringListPage;
