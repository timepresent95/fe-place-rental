import {
  ApplicationState,
  GatheringDetail,
} from "@/4.features/Gathering/model";

export type GatheringTableRow = {
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
  applicants: GatheringDetail["applicants"];
};

export type GatheringTalbe = {
  id: string;
  rows: GatheringTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
