import clsx from "clsx";

import { TableView } from "@/4.features/TableView/ui";
import { getMyReservation } from "@/5.entities/Rental/api";
import { TableColumns } from "@/5.entities/TableList/model";

import { formatRentalTable } from "../lib";
import { RentalTableRow } from "../model";

const columns: TableColumns<RentalTableRow> = [
  { accessKey: "hostName", columnName: "신청자" },
  { accessKey: "applicationState", columnName: "신청 현황" },
  { accessKey: "expectedParticipants", columnName: "예상 참여 인원" },
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
      cellClassName={(data, accessKey) =>
        clsx({
          "text-red-500":
            accessKey === "applicationState" && data[accessKey] === "거절",
          "text-green-700":
            accessKey === "applicationState" && data[accessKey] === "승인",
        })
      }
    />
  );
}

export default ReservationTable;
