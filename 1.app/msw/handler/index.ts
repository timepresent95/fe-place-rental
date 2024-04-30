import { HttpHandler } from "msw";

import gatheringHandler from "./gathering";
import rentalHandler from "./rental";
import userHandler from "./user";

const handlers: HttpHandler[] = [
  ...rentalHandler,
  ...userHandler,
  ...gatheringHandler,
];

export default handlers;
