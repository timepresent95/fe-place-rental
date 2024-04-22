import { ListRentalResponse } from "@/5.entities/rental/model";
import { RentalTableRow, RentalTalbe } from "./model";
import dayjs from "@/6.shared/lib/dayjs";

export const DEFAULT_PAGE_SIZE = 10;

export function formatRentalTable(listRental: ListRentalResponse): RentalTalbe {
  const datas: RentalTableRow[] = listRental.rentals.map((v) => ({
    id: v.id,
    applicatorName: v.applicantName,
    applicateStatus: v.isApproved ? "승인" : "거절",
    participantStatus: `${v.attendees}/${v.expectedParticipants}`,
    rentalDate: dayjs(v.useDate).format("YYYY-MM-DD"),
  }));

  return {
    id: listRental.id,
    rows: datas,
    total: listRental.total,
    pageSize: listRental.pageSize,
    offset: listRental.offset,
  };
}
