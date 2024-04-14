export type ReservationTableData = {
  id: string;
  applicatorName: string;
  applicateStatus: string;
  participantStatus: string;
  reservationDate: string;
};

export type ReservationTalbe = {
  id: string;
  datas: ReservationTableData[];
  total: number;
  pageSize: number;
  offset: number;
};
