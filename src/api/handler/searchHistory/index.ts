import { getUsersUserIdSearchHistories, postUsersUserIdSearchHistories } from "./|users|:userId|searchHistories";
import { deleteUsersUserIdSearchHistoriesSearchHistoriesId } from "./|users|:userId|searchHistories|:searchHistoriesId";

/**
 * @package
 */
export const searchHistoryHandler = [
  getUsersUserIdSearchHistories,
  postUsersUserIdSearchHistories,
  deleteUsersUserIdSearchHistoriesSearchHistoriesId,
];
