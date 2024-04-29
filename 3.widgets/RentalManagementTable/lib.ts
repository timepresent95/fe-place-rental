import { ListRentalResponse } from "@/5.entities/Rental/model";
import dayjs from "@/6.shared/lib/dayjs";

import { RentalManagementTableRow, RentalManagementTalbe } from "./model";

export const DEFAULT_PAGE_SIZE = 10;

export function formatRentalManagementTable(
  listRental: ListRentalResponse
): RentalManagementTalbe {
  const datas: RentalManagementTableRow[] = listRental.list.map((v) => ({
    id: v.id,
    applicantName: v.applicantName,
    rentalDate: dayjs(v.useDate).format("YYYY-MM-DD"),
    applicationDate: dayjs(v.applicationDate).format("YYYY-MM-DD"),
    contactEmail: v.contactEmail,
    contactPhone: v.contactPhone,
    purpose: v.purpose,
    expectedParticipants: v.expectedParticipants,
    applicationState: v.applicationState,
    isPublic: v.isPublic,
  }));

  return {
    id: listRental.id,
    rows: datas,
    total: listRental.total,
    pageSize: listRental.pageSize,
    offset: listRental.offset,
  };
}
