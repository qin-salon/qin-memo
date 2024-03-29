import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType, NoteType } from "src/api/handler/note/type";
import { useUser } from "src/util/user";
import { useSWRConfig } from "swr";

/**
 * @package
 */
export const useTogglePublicStatus = (note: NoteType) => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthUser();
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const togglePublicStatus = useCallback(async () => {
    if (!user) return;
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/notes/${note.id}/public`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${idToken}` },
    });
    mutate(`${API_URL}/notes/${note.id}`, { ...note, isPublic: !note.isPublic }, false);
    mutate(
      `${API_URL}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        const target = data.find(({ id }) => {
          return id === note.id;
        });
        if (!target) return;
        return [
          { ...target, isPublic: !target.isPublic },
          ...data.filter(({ id }) => {
            return id !== note.id;
          }),
        ];
      },
      false
    );
  }, [authUser, mutate, note, user]);

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
