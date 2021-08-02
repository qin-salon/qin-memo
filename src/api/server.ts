import { setupServer } from "msw/node";

import * as handler from "./handler";

/**
 * @package
 */
export const server = setupServer(...Object.values(handler));
