import { authHandler } from "./auth";
import { noteHandler } from "./note";
import { searchHistoryHandler } from "./searchHistory";
import { userHandler } from "./user";

/**
 * @package
 */
export const handler = [...authHandler, ...noteHandler, ...userHandler, ...searchHistoryHandler];
