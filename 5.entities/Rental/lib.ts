import { z } from "zod";

//TODO: unique한 결과를 가져올수 있도록 만들기
export const applyRentalBodyValidation = z.object({
  hostName: z.string().trim().min(1, "신청자 이름 입력해주세요"),
  contactEmail: z.string().email("올바른 형식의 메일을 입력해주세요"),
  contactPhone: z
    .string()
    .regex(/010-\d{4}-\d{4}|010\d{8}/, "올바른 형식의 전화번호를 입력해주세요"),
  purpose: z.string().trim().min(20, "최소 20자 이상 입력해주세요"),
  expectedParticipants: z
    .number()
    .gte(3, "참가 인원은 최소 3명 이상이어야합니다"),
  useDate: z.date({
    required_error: "예약일을 선택해주세요",
  }),
  isPublic: z.boolean(),
});

export const RentalValidation = applyRentalBodyValidation.extend({
  id: z.string(),
  applicationDate: z.date(),
  applicationState: z.union([
    z.literal("approved"),
    z.literal("rejected"),
    z.literal("pending"),
  ]),
  hostId: z.string(),
});

type RentalValidationKey = keyof z.infer<typeof RentalValidation>;

export function pickRentalValidation(keys: RentalValidationKey[]) {
  return RentalValidation.pick(
    keys.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {} as Record<RentalValidationKey, true>)
  );
}
