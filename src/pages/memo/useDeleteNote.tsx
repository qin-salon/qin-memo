import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType, NoteType } from "src/api/handler/note/type";
import { useUser } from "src/util/user";
import { useSWRConfig } from "swr";

/**
 * @package
 */
export const useDeleteNote = (note: NoteType) => {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const deleteNote = useCallback(async () => {
    if (!user) return;
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/notes/${note.id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await mutate(
      `${API_URL}/notes`,
      (notes: ListNoteType[]) => {
        if (!notes) return;
        return notes.filter(({ id }) => {
          return id !== note.id;
        });
      },
      false
    );
  }, [authUser, mutate, note.id, user]);

  const handleDeleteNote = useCallback(async () => {
    try {
      await toast.promise(deleteNote(), {
        loading: "処理中",
        success: "削除しました",
        error: "失敗しました",
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router]);

  return { handleDeleteNote };
};
