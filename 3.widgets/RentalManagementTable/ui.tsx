import { TableView } from "@/4.features/TableView/ui";
import { TableColumns } from "@/5.entities/TableList/model";
import { getListRental } from "@/5.entities/rental/api";
import { RentalManagementTableRow } from "./model";
import { formatRentalManagementTable } from "./lib";

const columns: TableColumns<RentalManagementTableRow> = [
  { accessKey: "id", columnName: "id" },
  { accessKey: "applicantName", columnName: "신청자" },
  { accessKey: "rentalDate", columnName: "대관 일" },
  { accessKey: "applicationDate", columnName: "신청 일" },
];

interface Props {
  pageSize: number;
  offset: number;
  paginationQueryKey: string;
}

async function RentalManagementTable({
  pageSize,
  offset,
  paginationQueryKey,
}: Props) {
  const response = await getListRental({ pageSize, offset });

  if (response.status === "error") {
    throw response.error;
  }

  const reservationTable = formatRentalManagementTable(response.data);

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
RentalManagementTable.displayName = "RentalManagementTable";

export default RentalManagementTable;
