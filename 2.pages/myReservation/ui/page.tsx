import ReservationTable from "@/3.widgets/ReservationTable/ui/my";
import { DEFAULT_PAGE_SIZE } from "../lib";
import { Suspense } from "react";
import { TableViewSkeleton } from "@/4.features/TableView/ui";
import { redirect } from "next/navigation";

const PAGINATION_QUERY_KEY = "page-index";
const PAGE_SIZE_QUERY_KEY = "page-size";

interface Props {
  searchParams?: {
    [PAGINATION_QUERY_KEY]: string;
    [PAGE_SIZE_QUERY_KEY]: string;
  };
}

function MyReservationPage({ searchParams }: Props) {
  const paginationQuery = searchParams?.[PAGINATION_QUERY_KEY];
  const pageSizeQuery = searchParams?.[PAGE_SIZE_QUERY_KEY];

  const pageIndex = Number(paginationQuery ?? 1);
  const pageSize = Number(pageSizeQuery ?? DEFAULT_PAGE_SIZE);
  const offset = (pageIndex - 1) * pageSize;

  if (paginationQuery === undefined || pageSizeQuery === undefined) {
    redirect(
      `/my/reservation?${PAGINATION_QUERY_KEY}=${pageIndex}&${PAGE_SIZE_QUERY_KEY}=${pageSize}`
    );
  }

  return (
    <Suspense fallback={<TableViewSkeleton />} key={`${pageSize}-${offset}`}>
      <ReservationTable
        pageSize={pageSize}
        offset={offset}
        paginationQueryKey={PAGINATION_QUERY_KEY}
      />
    </Suspense>
  );
}

MyReservationPage.displayName = "MyReservationPage";

export default MyReservationPage;
