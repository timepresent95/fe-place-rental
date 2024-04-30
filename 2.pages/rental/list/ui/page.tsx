import { Suspense } from "react";

import { redirect } from "next/navigation";

import RentalFilters from "@/3.widgets/RentalFilters/ui";
import RentalTable from "@/3.widgets/RentalTable/ui/list";
import { TableViewSkeleton } from "@/4.features/TableView/ui";

import {
  APPLICATION_STATE_FILTER_QUERY_KEY,
  DEFAULT_PAGE_SIZE,
  PAGINATION_QUERY_KEY,
  Props,
  createRedirectUrl,
  extractQuery,
} from "../lib";

function RentalListPage({ searchParams }: Props) {
  const { applicationState, pagination, pageSize, offset } =
    extractQuery(searchParams);

  if (
    pagination === undefined ||
    pageSize === undefined ||
    offset === undefined
  ) {
    return redirect(createRedirectUrl(applicationState, 1, DEFAULT_PAGE_SIZE));
  }

  return (
    <div className="container">
      <div className="flex items-center">
        <RentalFilters
          paginationQueryKey={PAGINATION_QUERY_KEY}
          filterQueryKey={APPLICATION_STATE_FILTER_QUERY_KEY}
        />
      </div>
      <Suspense fallback={<TableViewSkeleton />} key={`${pageSize}-${offset}`}>
        <RentalTable
          pageSize={pageSize}
          offset={offset}
          applicationState={applicationState}
          paginationQueryKey={PAGINATION_QUERY_KEY}
        />
      </Suspense>
    </div>
  );
}

RentalListPage.displayName = "ReservationListPage";

export default RentalListPage;
