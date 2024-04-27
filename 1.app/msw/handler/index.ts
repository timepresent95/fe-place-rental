import { HttpHandler } from "msw";

import autenticationHander from "./autentication";
import rentalHandler from "./rental";

const handlers: HttpHandler[] = [...rentalHandler, ...autenticationHander];

export default handlers;
