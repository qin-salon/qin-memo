import { noteHandler } from "./note";
import { searchHistoryHandler } from "./searchHistory";
import { userHandler } from "./user";

/**
 * @package
 */
export const handler = [...noteHandler, ...userHandler, ...searchHistoryHandler];
