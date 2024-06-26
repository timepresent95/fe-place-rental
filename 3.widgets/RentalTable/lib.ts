import {
  ListRentalResponse,
  APPLICANT_STATE_PRESENT,
} from "@/5.entities/Rental/model";
import dayjs from "@/6.shared/lib/dayjs";

import { RentalTableRow, RentalTalbe } from "./model";

export const DEFAULT_PAGE_SIZE = 10;

export function formatRentalTable(listRental: ListRentalResponse): RentalTalbe {
  const datas: RentalTableRow[] = listRental.list.map((v) => ({
    id: v.id,
    hostName: v.hostName,
    applicationState: APPLICANT_STATE_PRESENT[v.applicationState],
    expectedParticipants: v.expectedParticipants,
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
