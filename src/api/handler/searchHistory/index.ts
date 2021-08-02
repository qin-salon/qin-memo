import { deleteSearchHistoriesSearchHistoriesId } from "./|searchHistories|:searchHistoriesId";
import { getUsersUserIdSearchHistories, postUsersUserIdSearchHistories } from "./|users|:userId|searchHistories";

/**
 * @package
 */
export const searchHistoryHandler = [
  deleteSearchHistoriesSearchHistoriesId,
  getUsersUserIdSearchHistories,
  postUsersUserIdSearchHistories,
];
