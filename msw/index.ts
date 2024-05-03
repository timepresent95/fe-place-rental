import { setupServer } from "msw/node";

import handlers from "./handler";

export function init() {
  const server = setupServer(...handlers);
  //NOTE: get list of handler
  // console.log("server handler\n", server.listHandlers());
  server.listen({ onUnhandledRequest: "bypass" });

  //NOTE: get request information for debugging
  // server.events.on("request:match", ({ request }) => {
  //   console.log("Outgoing:", request.method, request.url);
  // });
}
