import { Rental } from "@/5.entities/Rental/model";
import { User } from "@/5.entities/User/model";

export const APPLICATION_STATE_PRESENT = {
  approved: "승인",
  rejected: "거절",
  pending: "심사중",
};

export type ApplicationState = keyof typeof APPLICATION_STATE_PRESENT;

export type GatheringDetail = Rental & {
  attendees: string[];
  applicants: (User & { applicationState: ApplicationState })[];
};

export type ListGatheringRequestQuery = {
  pageSize: number;
  offset: number;
  available?: boolean;
  sort?: "applicationDate" | "useDate";
  sortDirection?: "desc" | "asc";
};

export interface ListGatheringResponse {
  id: string;
  list: GatheringDetail[];
  total: number;
  pageSize: number;
  offset: number;
}

export interface ApplyGatheringRequestBody {
  rentalId: string;
}

export type ApplyGatheringResponse = {
  rentalId: string;
};

export type InvitaionGatheringReqeustParam = string;
export interface InvitaionGatheringRequestBody {
  applicantId: string;
  applicationState: ApplicationState;
}

export type InvitaionGatheringResponse = {
  rentalId: string;
};

export type MyGatheringRequestQuery = {
  pageSize: number;
  offset: number;
};

export interface MyGatheringResponse {
  id: string;
  list: GatheringDetail[];
  total: number;
  pageSize: number;
  offset: number;
}
