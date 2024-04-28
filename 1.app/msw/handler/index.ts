import { HttpHandler } from "msw";

import rentalHandler from "./rental";
import userHandler from "./user";

const handlers: HttpHandler[] = [...rentalHandler, ...userHandler];

export default handlers;
