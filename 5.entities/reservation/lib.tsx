import { z } from "zod";

export const postReservationBodyValidation = z.object({
  applicantName: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  purpose: z.string(),
  expectedParticipants: z.number(),
  useDate: z.date(),
  isPublic: z.boolean(),
});
