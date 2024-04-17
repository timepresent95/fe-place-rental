import { setupWorker } from "msw/browser";
import handlers from "./handler";
import { faker } from "@faker-js/faker";

faker.seed(100);
const worker = setupWorker(...handlers);

//NOTE: react strict mode에서 두번 실행되는 문제 해결
let isAlreadyStart = false;

export async function initMswInWorker() {
  if (isAlreadyStart) {
    return;
  }
  isAlreadyStart = true;
  console.log("worker handler\n", worker.listHandlers());
  return worker.start({ onUnhandledRequest: "bypass" });
}
