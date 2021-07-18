import { setupWorker } from "msw";
import { handlers } from "src/mocks/handlers";

export const worker = setupWorker(...handlers);
