import { Rental } from "@/5.entities/Rental/model";

export const APPLICATION_STATE_PRESENT = {
  approved: "승인",
  rejected: "거절",
  pending: "심사중",
};

export type ApplicationState = keyof typeof APPLICATION_STATE_PRESENT;

interface GatheringApplicant {
  applicantId: string;
  applicationDate: Date;
  applicationState: ApplicationState;
}

export interface Gathering {
  rentalId: string;
  applicants: GatheringApplicant[];
}

export type ListGatheringRequestQuery = {
  pageSize: number;
  offset: number;
  available?: true;
  sort?: "applicationDate" | "useDate";
  sortDirection?: "desc" | "asc";
};

export interface ListGatheringResponse {
  id: string;
  list: (Rental & { attendees: number })[];
  total: number;
  pageSize: number;
  offset: number;
}

export interface ApplyGatheringRequestBody {
  applicantId: string;
  rentalId: string;
}

export type ApplyGatheringResponse = Gathering;

export type InvitaionGatheringReqeustParam = Gathering["rentalId"];
export interface InvitaionGatheringRequestBody {
  applicantId: string;
  applicationState: ApplicationState;
}

export type InvitaionGatheringResponse = Gathering;
