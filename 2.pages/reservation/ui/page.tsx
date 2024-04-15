import ReservationTable from "@/3.widgets/ReservationTable/ui";
import { DEFAULT_PAGE_SIZE } from "../lib";
import { Suspense } from "react";
import { TableViewSkeleton } from "@/4.features/TableView/ui";

const PAGINATION_QUERY_KEY = "page-index";
const PAGE_SIZE_QUERY_KEY = "page-size";

interface Props {
  searchParams?: {
    [PAGINATION_QUERY_KEY]: string;
    [PAGE_SIZE_QUERY_KEY]: string;
  };
}

function ReservationPage({ searchParams }: Props) {
  const pageIndex = Number(searchParams?.[PAGINATION_QUERY_KEY] ?? 1);
  const pageSize = Number(
    searchParams?.[PAGE_SIZE_QUERY_KEY] ?? DEFAULT_PAGE_SIZE
  );
  const offset = (pageIndex - 1) * pageSize;

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

export { ReservationPage };
