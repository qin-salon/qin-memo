import { setupWorker } from "msw";

import * as handler from "./handler";

/**
 * @package
 */
export const worker = setupWorker(...Object.values(handler));
