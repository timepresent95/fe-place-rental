import { TableView, TableViewSkeleton } from "@/4.features/TableView/ui";
import { TableColumns } from "@/5.entities/TableList/model";
import { getListReservation } from "@/5.entities/reservation/api";
import { ReservationTableData } from "./model";
import { formatReservationTableData } from "./lib";
import { Suspense } from "react";

const columns: TableColumns<ReservationTableData> = [
  { accessKey: "applicatorName", columnName: "신청자" },
  { accessKey: "applicateStatus", columnName: "신청 현황" },
  { accessKey: "participantStatus", columnName: "참여 현황" },
  { accessKey: "reservationDate", columnName: "대관일" },
];

interface Props {
  pageSize: number;
  offset: number;
  paginationQueryKey: string;
}

async function ReservationTable({
  pageSize,
  offset,
  paginationQueryKey,
}: Props) {
  const response = await getListReservation({ pageSize, offset });

  if (response.status === "error") {
    //TODO: 서버 에러 관련 핸들링 필요
    return;
  }

  const reservationTable = formatReservationTableData(response.data);

  return (
    <TableView
      columns={columns}
      datas={reservationTable.datas}
      pageSize={reservationTable.pageSize}
      total={reservationTable.total}
      paginationQueryKey={paginationQueryKey}
    />
  );
}

export default ReservationTable;
