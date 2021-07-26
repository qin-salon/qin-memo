import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { useUser } from "src/contexts/user";
import type { ListNoteType, NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import { mutate } from "swr";

/**
 * @package
 */
export const useNoteAction = (note: NoteType) => {
  const authUser = useAuthUser();
  const { user } = useUser();

  const togglePublicStatus = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/notes/${note.id}/public`, {
      method: "patch",
      headers: { authorization: `Bearer ${idToken}` },
    });
    mutate(`${API_URL}/v1/notes/${note.id}`, { ...note, public: !note.public }, false);
    mutate(
      `${API_URL}/v1/users/${user?.id}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        const target = data.filter(({ id }) => {
          return id === note.id;
        })[0];
        const others = data.filter(({ id }) => {
          return id !== note.id;
        });
        return [{ ...target, public: !target.public }, ...others];
      },
      false
    );
  }, [authUser, note, user?.id]);

  const deleteNote = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/notes/${note.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
    mutate(
      `${API_URL}/v1/users/${user?.id}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        return data.filter(({ id }) => {
          return id !== note.id;
        });
      },
      false
    );
  }, [authUser, note.id, user?.id]);

  return { togglePublicStatus, deleteNote };
};
