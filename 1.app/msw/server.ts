import { faker } from "@faker-js/faker";
import { setupServer } from "msw/node";

import handlers from "./handler";

const server = setupServer(...handlers);

export function initMswInServer() {
  console.log("server handler\n", server.listHandlers());
  faker.seed(100);
  server.listen({ onUnhandledRequest: "bypass" });
  //NOTE: debug
  server.events.on("request:match", ({ request }) => {
    console.log("Outgoing:", request.method, request.url);
  });
}
