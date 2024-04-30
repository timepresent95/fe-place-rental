import { GatheringDetail } from "@/4.features/Gathering/model";
import { ApplicationState } from "@/5.entities/Rental/model";

export type GatheringManagementTableRow = {
  id: string;
  hostName: string;
  gatheringDate: string;
  applicationDate: string;
  contactEmail: string;
  contactPhone: string;
  purpose: string;
  participantState: string;
  applicationState: ApplicationState;
  isPublic: boolean;
  attendees: GatheringDetail["attendees"];
  applicants: GatheringDetail["applicants"];
};

export type GatheringManagementTalbe = {
  id: string;
  rows: GatheringManagementTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
