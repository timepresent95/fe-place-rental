import { HttpHandler } from "msw";

import rentalHandler from "./rental";
import autenticationHander from "./autentication";

const handlers: HttpHandler[] = [...rentalHandler, ...autenticationHander];

export default handlers;
