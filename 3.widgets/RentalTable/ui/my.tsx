import { TableView } from "@/4.features/TableView/ui";
import { TableColumns } from "@/5.entities/TableList/model";
import { getMyReservation } from "@/5.entities/rental/api";
import { RentalTableRow } from "../model";
import { formatRentalTable } from "../lib";

const columns: TableColumns<RentalTableRow> = [
  { accessKey: "applicatorName", columnName: "신청자" },
  { accessKey: "applicateStatus", columnName: "신청 현황" },
  { accessKey: "participantStatus", columnName: "참여 현황" },
  { accessKey: "rentalDate", columnName: "대관일" },
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
  const response = await getMyReservation({ pageSize, offset });
  if (response.status === "error") {
    throw response.error;
  }

  const reservationTable = formatRentalTable(response.data);

  return (
    <TableView
      columns={columns}
      datas={reservationTable.rows}
      pageSize={reservationTable.pageSize}
      total={reservationTable.total}
      paginationQueryKey={paginationQueryKey}
      emptyMessage="예약이 없습니다."
    />
  );
}

export default ReservationTable;
