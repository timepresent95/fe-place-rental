import { z } from "zod";

import { applyRentalBodyValidation } from "./lib";

export type ApplyRentalRequestBody = z.infer<typeof applyRentalBodyValidation>;

export const APPLICANT_STATE_PRESENT = {
  approved: "승인",
  rejected: "거절",
  pending: "심사중",
};

export type ApplicationState = keyof typeof APPLICANT_STATE_PRESENT;

export type Rental = ApplyRentalRequestBody & {
  id: string;
  applicationDate: Date;
  applicationState: ApplicationState;
  hostId?: string;
};

export type ApplyRentalResponse = Rental;

export type PatchRentalRequestParam = Rental["id"];
export type PatchRentalRequestBody = Partial<Rental>;

export type PatchRentalResponse = Rental;

export type ListRentalRequestQuery = {
  pageSize: number;
  offset: number;
  applicationState?: ApplicationState[];
  sort?: "applicationDate" | "useDate";
  sortDirection?: "desc" | "asc";
};

export interface ListRentalResponse {
  id: string;
  list: Rental[];
  total: number;
  pageSize: number;
  offset: number;
}

export type MyRentalRequestQuery = {
  pageSize: number;
  offset: number;
};

export interface MyRentalResponse {
  id: string;
  list: Rental[];
  total: number;
  pageSize: number;
  offset: number;
}
