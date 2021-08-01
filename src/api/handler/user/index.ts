import { postUsers } from "./|users";
import { getUsersUserId, putUsersUserId } from "./|users|:userId";

/**
 * @package
 */
export const userHandler = [postUsers, getUsersUserId, putUsersUserId];
