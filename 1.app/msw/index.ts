import { setupServer } from "msw/node";
import handlers from "./handler";
import { faker } from "@faker-js/faker";

const server = setupServer(...handlers);

export function initMsw() {
  console.log("run with msw");
  faker.seed(100);
  server.listen({
    onUnhandledRequest: "bypass",
  });
}
