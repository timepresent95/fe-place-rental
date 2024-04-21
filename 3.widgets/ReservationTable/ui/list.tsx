import { TableView } from "@/4.features/TableView/ui";
import { TableColumns } from "@/5.entities/TableList/model";
import { getListReservation } from "@/5.entities/reservation/api";
import { ReservationTableData } from "../model";
import { formatReservationTableData } from "../lib";

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
    throw response.error;
  }

  const reservationTable = formatReservationTableData(response.data);

  return (
    <TableView
      columns={columns}
      datas={reservationTable.datas}
      pageSize={reservationTable.pageSize}
      total={reservationTable.total}
      paginationQueryKey={paginationQueryKey}
      emptyMessage="예약이 없습니다."
    />
  );
}

export default ReservationTable;
