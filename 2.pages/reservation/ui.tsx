import TableView from "@/4.features/TableView/ui";
import { TableColumns } from "@/5.entities/TableList/model";
import { getListReservation } from "@/5.entities/reservation/api";
import { ReservationTableData } from "./model";
import { formatReservationTableData } from "./lib";
import { Suspense } from "react";

export const PAGINATION_QUERY_KEY = "page-index";
export const PAGE_SIZE_QUERY_KEY = "page-size";

const columns: TableColumns<ReservationTableData> = [
  { accessKey: "applicatorName", columnName: "신청자" },
  { accessKey: "applicateStatus", columnName: "신청 현황" },
  { accessKey: "participantStatus", columnName: "참여 현황" },
  { accessKey: "reservationDate", columnName: "대관일" },
];

interface Props {
  searchParams?: {
    [PAGINATION_QUERY_KEY]: string;
    [PAGE_SIZE_QUERY_KEY]: string;
  };
}

export const DEFAULT_PAGE_SIZE = 10;

async function ReservationPage({ searchParams }: Props) {
  const pageIndex = Number(searchParams?.[PAGINATION_QUERY_KEY] ?? 1);
  const pageSize = Number(
    searchParams?.[PAGE_SIZE_QUERY_KEY] ?? DEFAULT_PAGE_SIZE
  );

  const response = await getListReservation({
    pageSize,
    offset: (pageIndex - 1) * pageSize,
  });

  if (response.status === "error") {
    //TODO: 서버 에러 관련 핸들링 필요
    return;
  }

  const reservationTable = formatReservationTableData(response.data);

  return (
    <main className="px-4">
      {/* Suspense Fallback 구현해야 함 */}
      <Suspense fallback={<div />}>
        <TableView
          columns={columns}
          datas={reservationTable.datas}
          pageSize={reservationTable.pageSize}
          total={reservationTable.total}
          pagenationQuery={PAGINATION_QUERY_KEY}
        />
      </Suspense>
    </main>
  );
}

export { ReservationPage };
