export type RentalManagementTableRow = {
  id: string;
  applicantName: string;
  rentalDate: string;
  applicationDate: string;
};

export type RentalManagementTalbe = {
  id: string;
  rows: RentalManagementTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
