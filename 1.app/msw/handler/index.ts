import { HttpHandler } from "msw";

import reservationHander from "./reservation";

const handlers: HttpHandler[] = [...reservationHander];

export default handlers;
