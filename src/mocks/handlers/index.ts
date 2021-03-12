import { notesHandlers } from "src/mocks/handlers/notes";
import { searchHistoriesHandlers } from "src/mocks/handlers/searchHistories";
import { usersHandlers } from "src/mocks/handlers/users";

export const handlers = [...usersHandlers, ...notesHandlers, ...searchHistoriesHandlers];
