import { HttpHandler } from "msw";
import { setupServer } from "msw/node";

const handlers: HttpHandler[] = [];

export const server = setupServer(...handlers);
