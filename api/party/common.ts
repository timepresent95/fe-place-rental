export type PartyInfo = {
  partyId: string;
  host: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
  place: {
    id: string;
    address: string;
    name: string;
  };
  title: string;
  description: string;
  capacity: number;
  headcount: number;
  requestState: string;
  openAt: Date;
  closeAt: Date;
  partyAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
