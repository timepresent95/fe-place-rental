import { MyGatheringResponse } from "@/4.features/Gathering/model";
import dayjs from "@/6.shared/lib/dayjs";

import { GatheringManagementTableRow, GatheringManagementTalbe } from "./model";

export const DEFAULT_PAGE_SIZE = 10;

export function formatGatheringTable(
  listGathering: MyGatheringResponse
): GatheringManagementTalbe {
  const datas: GatheringManagementTableRow[] = listGathering.list.map((v) => ({
    id: v.id,
    hostName: v.hostName,
    gatheringDate: dayjs(v.useDate).format("YYYY-MM-DD"),
    applicationDate: dayjs(v.applicationDate).format("YYYY-MM-DD"),
    contactEmail: v.contactEmail,
    contactPhone: v.contactPhone,
    purpose: v.purpose,
    participantState: `${v.attendees.length} / ${v.expectedParticipants}`,
    applicationState: v.applicationState,
    isPublic: v.isPublic,
    attendees: v.attendees,
    applicants: v.applicants,
  }));

  return {
    id: listGathering.id,
    rows: datas,
    total: listGathering.total,
    pageSize: listGathering.pageSize,
    offset: listGathering.offset,
  };
}
