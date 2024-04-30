import { getListGathering } from "@/4.features/Gathering/api";
import { TableWithDialogView } from "@/4.features/TableWithDialogView/ui";
import { TableColumns } from "@/5.entities/TableWithDialog/model";

import GatheringDetailDialog from "./GatheringDetailDialog";
import { formatGatheringTable } from "../lib";
import { GatheringTableRow } from "../model";

const columns: TableColumns<GatheringTableRow> = [
  {
    accessKey: "purpose",
    columnName: "모임 소개",
    className: "max-w-64 truncate",
  },
  { accessKey: "applicantName", columnName: "신청자" },
  { accessKey: "gatheringDate", columnName: "모임 예정일" },
  { accessKey: "applicationDate", columnName: "신청 일" },
];

interface Props {
  pageSize: number;
  offset: number;
  availableFilter?: boolean;
  paginationQueryKey: string;
}

async function EventTable({
  pageSize,
  offset,
  availableFilter,
  paginationQueryKey,
}: Props) {
  const response = await getListGathering({
    pageSize,
    offset,
    available: availableFilter,
    sort: "useDate",
  });

  if (response.status === "error") {
    throw response.error;
  }

  const reservationTable = formatGatheringTable(response.data);

  return (
    <TableWithDialogView
      columns={columns}
      datas={reservationTable.rows}
      pageSize={reservationTable.pageSize}
      total={reservationTable.total}
      paginationQueryKey={paginationQueryKey}
      emptyMessage="예약이 없습니다.">
      <GatheringDetailDialog />
    </TableWithDialogView>
  );
}
EventTable.displayName = "EventTable";

export default EventTable;
