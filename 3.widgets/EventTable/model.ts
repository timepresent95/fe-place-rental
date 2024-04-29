import { ApplicationState } from "@/5.entities/Rental/model";

export type EventTableRow = {
  id: string;
  applicantName: string;
  eventDate: string;
  applicationDate: string;
  contactEmail: string;
  contactPhone: string;
  purpose: string;
  expectedParticipants: number;
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
