import { HttpHandler } from "msw";

import { partyApi } from "./party";

const handlers: HttpHandler[] = [...partyApi];

export default handlers;
