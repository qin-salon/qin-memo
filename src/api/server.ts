import { setupServer } from "msw/node";

import { handler } from "./handler";

/**
 * @package
 */
export const server = setupServer(...handler);
