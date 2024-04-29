import { TableWithDialogView } from "@/4.features/TableWithDialogView/ui";
import { getListRental } from "@/5.entities/rental/api";
import { TableColumns } from "@/5.entities/TableList/model";

import EventDetailDialog from "./EventDetailDialog";
import { formatEventTable } from "../lib";
import { EventTableRow } from "../model";

const columns: TableColumns<EventTableRow> = [
  { accessKey: "purpose", columnName: "행사 소개" },
  { accessKey: "applicantName", columnName: "신청자" },
  { accessKey: "rentalDate", columnName: "대관 일" },
  { accessKey: "applicationDate", columnName: "신청 일" },
];

interface Props {
  pageSize: number;
  offset: number;
  paginationQueryKey: string;
}

async function EventTable({ pageSize, offset, paginationQueryKey }: Props) {
  const response = await getListRental({
    pageSize,
    offset,
    applicationState: ["approved"],
    sort: "useDate",
  });

  if (response.status === "error") {
    throw response.error;
  }

  const reservationTable = formatEventTable(response.data);

  return (
    <TableWithDialogView
      columns={columns}
      datas={reservationTable.rows}
      pageSize={reservationTable.pageSize}
      total={reservationTable.total}
      paginationQueryKey={paginationQueryKey}
      emptyMessage="예약이 없습니다.">
      <EventDetailDialog />
    </TableWithDialogView>
  );
}
EventTable.displayName = "EventTable";

export default EventTable;
