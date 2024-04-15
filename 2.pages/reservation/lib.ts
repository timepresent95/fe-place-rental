import { ListReservationResponse } from "@/5.entities/reservation/model";
import { ReservationTableData, ReservationTalbe } from "./model";
import dayjs from "@/6.shared/lib/dayjs";

export const DEFAULT_PAGE_SIZE = 10;

export function formatReservationTableData(
  reservationList: ListReservationResponse
): ReservationTalbe {
  const datas: ReservationTableData[] = reservationList.reservations.map(
    (v) => ({
      id: v.id,
      applicatorName: v.hostName,
      applicateStatus: v.isApproved ? "승인" : "거절",
      participantStatus: `${v.attendees}/${v.capacity}`,
      reservationDate: dayjs(v.useDate).format("YYYY-MM-DD"),
    })
  );

  return {
    id: reservationList.id,
    datas,
    total: reservationList.total,
    pageSize: reservationList.pageSize,
    offset: reservationList.offset,
  };
}
