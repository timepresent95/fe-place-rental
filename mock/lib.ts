import { getRandom } from "@/util/math";

export type RequestState = "approved" | "rejected" | "pending";

export function getRandomRequestState() {
  return ["approved", "rejected", "pending"][
    getRandom({ max: 2 })
  ] as RequestState;
}
