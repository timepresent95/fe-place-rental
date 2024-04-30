import { getMyGathering } from "@/4.features/Gathering/api";
import { TableWithDialogView } from "@/4.features/TableWithDialogView/ui";
import { TableColumns } from "@/5.entities/TableWithDialog/model";

import RentalDetailDialog from "./RentalDetailDialog";
import { formatGatheringTable } from "../lib";
import { GatheringManagementTableRow } from "../model";

const columns: TableColumns<GatheringManagementTableRow> = [
  {
    accessKey: "purpose",
    columnName: "모임 소개",
    className: "max-w-64 truncate",
  },
  { accessKey: "participantState", columnName: "참여 현황" },
  { accessKey: "gatheringDate", columnName: "모임 예정일" },
  { accessKey: "applicationDate", columnName: "신청 일" },
];

interface Props {
  pageSize: number;
  offset: number;
  paginationQueryKey: string;
}

async function GatheringManagementTable({
  pageSize,
  offset,
  paginationQueryKey,
}: Props) {
  const response = await getMyGathering({
    pageSize,
    offset,
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
      <RentalDetailDialog />
    </TableWithDialogView>
  );
}
GatheringManagementTable.displayName = "GatheringManagementTable";

export default GatheringManagementTable;
