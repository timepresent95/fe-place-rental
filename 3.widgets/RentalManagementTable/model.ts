export type RentalManagementTableRow = {
  id: string;
  applicantName: string;
  rentalDate: string;
  applicationDate: string;
  contactEmail: string;
  contactPhone: string;
  purpose: string;
  expectedParticipants: number;
  isPublic: boolean;
};

export type RentalManagementTalbe = {
  id: string;
  rows: RentalManagementTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
