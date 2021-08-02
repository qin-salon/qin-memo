import { postApiSignin } from "./|api|signin";
import { postApiSignout } from "./|api|signout";

/**
 * @package
 */
export const authHandler = [postApiSignin, postApiSignout];
