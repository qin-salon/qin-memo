import type { AuthUserContext } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";
import { isUserType } from "src/api/handler/user/type";

/**
 * @package
 */
export const createUser = async (idToken: string, authUser: AuthUserContext): Promise<UserType | undefined> => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
      body: JSON.stringify({
        uid: authUser.id,
        accountName: authUser.displayName,
        avatarUrl: authUser.photoURL,
      }),
    });
    const data = await res.json();

    if (!isUserType(data)) {
      throw new Error("Failed to create user");
    }

    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
