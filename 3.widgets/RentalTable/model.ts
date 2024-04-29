export type RentalTableRow = {
  id: string;
  applicantName: string;
  applicationState: string;
  expectedParticipants: number;
  rentalDate: string;
};

export type RentalTalbe = {
  id: string;
  rows: RentalTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
