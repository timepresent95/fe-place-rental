import { ApplicationState } from "@/4.features/Gathering/model";

export type EventTableRow = {
  id: string;
  applicantName: string;
  eventDate: string;
  applicationDate: string;
  contactEmail: string;
  contactPhone: string;
  purpose: string;
  participantState: string;
  applicationState: ApplicationState;
  isPublic: boolean;
};

export type EventTalbe = {
  id: string;
  rows: EventTableRow[];
  total: number;
  pageSize: number;
  offset: number;
};
