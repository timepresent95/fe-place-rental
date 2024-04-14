import { z } from "zod";
import { reservationPostValidation } from "./lib";

export type ReservationPostRequest = z.infer<typeof reservationPostValidation>;

export type Reservation = ReservationPostRequest & {
  id: string;
  attendees: number;
  applicationDate: Date;
  isApproved: boolean;
};
