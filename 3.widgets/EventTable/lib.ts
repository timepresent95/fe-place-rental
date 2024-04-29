import { ListRentalResponse } from "@/5.entities/Rental/model";
import dayjs from "@/6.shared/lib/dayjs";

import { EventTableRow, EventTalbe } from "./model";

export const DEFAULT_PAGE_SIZE = 10;

export function formatEventTable(listEvent: ListRentalResponse): EventTalbe {
  const datas: EventTableRow[] = listEvent.list.map((v) => ({
    id: v.id,
    applicantName: v.applicantName,
    eventDate: dayjs(v.useDate).format("YYYY-MM-DD"),
    applicationDate: dayjs(v.applicationDate).format("YYYY-MM-DD"),
    contactEmail: v.contactEmail,
    contactPhone: v.contactPhone,
    purpose: v.purpose,
    expectedParticipants: v.expectedParticipants,
    applicationState: v.applicationState,
    isPublic: v.isPublic,
  }));

  return {
    id: listEvent.id,
    rows: datas,
    total: listEvent.total,
    pageSize: listEvent.pageSize,
    offset: listEvent.offset,
  };
}
