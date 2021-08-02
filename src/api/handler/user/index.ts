import { getUsers, postUsers } from "./|users";
import { getUsersUserId, putUsersUserId } from "./|users|:userId";

/**
 * @package
 */
export const userHandler = [getUsers, postUsers, getUsersUserId, putUsersUserId];
