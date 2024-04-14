import { z } from "zod";

export const postReservationBodyValidation = z.object({
  hostName: z.string(),
  hostEmail: z.string().email(),
  hostPhone: z.string(),
  groupDescribtion: z.string(),
  capacity: z.number(),
  useDate: z.date(),
});
