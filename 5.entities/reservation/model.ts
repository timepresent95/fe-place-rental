import { z } from "zod";
import { postReservationBodyValidation } from "./lib";

export type PostReservationRequestBody = z.infer<
  typeof postReservationBodyValidation
>;

export type Reservation = PostReservationRequestBody & {
  id: string;
  attendees: number;
  applicationDate: Date;
  isApproved: boolean;
  applicantId?: string;
};

export type PostReservationResponse = Reservation;

export type ListReservationRequestQuery = {
  pageSize: number;
  offset: number;
};

export interface ListReservationResponse {
  id: string;
  reservations: Reservation[];
  total: number;
  pageSize: number;
  offset: number;
}
