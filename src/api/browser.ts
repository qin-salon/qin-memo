import { setupWorker } from "msw";

import { handler } from "./handler";

/**
 * @package
 */
export const worker = setupWorker(...handler);
