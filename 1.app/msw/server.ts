import { setupServer } from "msw/node";
import handlers from "./handler";
import { faker } from "@faker-js/faker";

const server = setupServer(...handlers);

export function initMswInServer() {
  console.log("run with msw in server");
  console.log("server handler\n", server.listHandlers());
  faker.seed(100);
  server.listen({onUnhandledRequest: 'bypass'});
}
