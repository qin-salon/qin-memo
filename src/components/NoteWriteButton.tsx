import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { isNoteType } from "src/api/handler/note/type";
import { Button } from "src/components/shared/Buttons";
import { useUser } from "src/contexts/user";
import { API_URL } from "src/utils/constants";

export const NoteWriteButton = () => {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();

  const handleCreateMemo = useCallback(async () => {
    if (!user?.id) return;
    try {
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/v1/users/${user.id}/notes`, {
        method: "POST",
        headers: { authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (!isNoteType(data)) {
        throw new Error("Failed to create memo");
      }
      await router.push(`/memos/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [authUser, router, user?.id]);

  return (
    <Button key="write memo" variant="solid-blue" onClick={handleCreateMemo} className="px-4 h-10">
      メモを書く
    </Button>
  );
};
