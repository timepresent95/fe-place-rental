export type RequestState = "approved" | "rejected" | "pending";

export function getRandomRequestState() {
  return ["approved", "rejected", "pending"][Math.random() * 2] as RequestState;
}
