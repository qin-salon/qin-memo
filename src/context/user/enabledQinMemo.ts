import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";

/**
 * @package
 */
export const enabledQinMemo = async (idToken: string, user?: UserType): Promise<void> => {
  if (!user) return;
  try {
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
      body: JSON.stringify({ enabledQinMemo: true }),
    });
    if (!res.ok) {
      throw new Error("Failed to enable qin memo");
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
