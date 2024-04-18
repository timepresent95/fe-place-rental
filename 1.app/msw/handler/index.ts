import { HttpHandler } from "msw";

import reservationHander from "./reservation";
import autenticationHander from "./autentication";

const handlers: HttpHandler[] = [...reservationHander, ...autenticationHander];

export default handlers;
