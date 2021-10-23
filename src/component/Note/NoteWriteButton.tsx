import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMemo = useCallback(async () => {
    setIsLoading(true);
    if (!user) {
      await router.push(`/auth/signin`);
      setIsLoading(false);
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
      toast.error("メモの作成に失敗しました。時間を空けてから再度お試しください。");
      setIsLoading(false);
      console.error(error);
    }
  }, [authUser, router, user]);

  return (
    <Button key="write memo" className="px-4 h-10" variant="solid-blue" onClick={handleCreateMemo} disabled={isLoading}>
      メモを書く
    </Button>
  );
};
