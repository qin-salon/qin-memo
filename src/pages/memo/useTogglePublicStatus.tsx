import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType, NoteType } from "src/api/handler/note/type";
import { useUser } from "src/util/user";
import { mutate } from "swr";

/**
 * @package
 */
export const useTogglePublicStatus = (note: NoteType) => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthUser();
  const { user } = useUser();

  const togglePublicStatus = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/notes/${note.id}/public`, {
      method: "patch",
      headers: { authorization: `Bearer ${idToken}` },
    });
    mutate(`${API_URL}/notes/${note.id}`, { ...note, isPublic: !note.isPublic }, false);
    mutate(
      `${API_URL}/users/${user?.id}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        const target = data.filter(({ id }) => {
          return id === note.id;
        })[0];
        const others = data.filter(({ id }) => {
          return id !== note.id;
        });
        return [{ ...target, isPublic: !target.isPublic }, ...others];
      },
      false
    );
  }, [authUser, note, user?.id]);

  const handleTogglePublic = useCallback(async () => {
    setIsLoading(true);
    try {
      await toast.promise(togglePublicStatus(), {
        loading: "処理中",
        success: note.isPublic ? "非公開にしました" : "公開しました",
        error: "失敗しました",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [note.isPublic, togglePublicStatus]);

  return { isLoading, handleTogglePublic };
};
