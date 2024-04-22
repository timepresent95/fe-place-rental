import { z } from "zod";
import { applyRentalBodyValidation } from "./lib";

export type ApplyRentalRequestBody = z.infer<typeof applyRentalBodyValidation>;

export type Rental = ApplyRentalRequestBody & {
  id: string;
  attendees: number;
  applicationDate: Date;
  isApproved: boolean;
  applicantId?: string;
};

export type ApplyRentalResponse = Rental;

export type ListRentalRequestQuery = {
  pageSize: number;
  offset: number;
};

export interface ListRentalResponse {
  id: string;
  rentals: Rental[];
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
  rentals: Rental[];
  total: number;
  pageSize: number;
  offset: number;
}
