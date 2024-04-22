export type RentalTableRow = {
  id: string;
  applicatorName: string;
  applicateStatus: string;
  participantStatus: string;
  rentalDate: string;
};

export type RentalTalbe = {
  id: string;
  rows: RentalTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
