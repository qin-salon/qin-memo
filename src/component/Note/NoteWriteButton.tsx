import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { API_URL } from "src/api/endpoint";
import { isNoteType } from "src/api/handler/note/type";
import { Button } from "src/component/Button";
import { useUser } from "src/util/user";

/**
 * @package
 */
export const NoteWriteButton = () => {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();

  const handleCreateMemo = useCallback(async () => {
    if (!user) {
      await router.push(`/auth/signin`);
      return;
    }

    try {
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/users/${user.userName}/notes`, {
        method: "POST",
        headers: { authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (!isNoteType(data)) {
        throw new Error("Failed to create memo");
      }
      await router.push(`/memo/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [authUser, router, user]);

  return (
    <Button key="write memo" variant="solid-blue" onClick={handleCreateMemo} className="px-4 h-10">
      メモを書く
    </Button>
  );
};