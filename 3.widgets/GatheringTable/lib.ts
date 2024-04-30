import { ListGatheringResponse } from "@/4.features/Gathering/model";
import dayjs from "@/6.shared/lib/dayjs";

import { GatheringTableRow, GatheringTalbe } from "./model";

export const DEFAULT_PAGE_SIZE = 10;

export function formatGatheringTable(
  listGathering: ListGatheringResponse
): GatheringTalbe {
  const datas: GatheringTableRow[] = listGathering.list.map((v) => ({
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
  }));

  return {
    id: listGathering.id,
    rows: datas,
    total: listGathering.total,
    pageSize: listGathering.pageSize,
    offset: listGathering.offset,
  };
}
