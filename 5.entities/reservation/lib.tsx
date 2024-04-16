import { z } from "zod";

export const postReservationBodyValidation = z.object({
  applicantName: z.string(),
  applicantEmail: z.string().email(),
  applicantPhone: z.string(),
  groupDescribtion: z.string(),
  capacity: z.number(),
  useDate: z.date(),
});
