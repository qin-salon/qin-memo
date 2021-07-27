import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { useUser } from "src/contexts/user";
import type { ListNoteType, NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import { mutate } from "swr";
import { useDebouncedCallback } from "use-debounce";

export const NoteEditor = (props: NoteType) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();

  const saveNote = useCallback(
    async (value: string) => {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/v1/notes/${props.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ content: value.trim() }),
      });
      await mutate(`${API_URL}/v1/users/${user?.id}/notes`);
    },
    [authUser, props.id, user?.id]
  );

  const deleteNote = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/notes/${props.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await mutate(
      `${API_URL}/v1/users/${user?.id}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        return data.filter(({ id }) => {
          return id !== props.id;
        });
      },
      false
    );
  }, [authUser, props.id, user?.id]);

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await saveNote(value);
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      return debounced(e.target.value);
    },
    [debounced]
  );

  const handleBlur = useCallback(async () => {
    if (ref.current?.value === undefined) return;
    if (ref.current.value.trim() === "") {
      await deleteNote();
    } else {
      await saveNote(ref.current.value);
    }
  }, [deleteNote, saveNote]);

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url !== "/" || ref.current?.value === undefined) {
        return true;
      }
      if (ref.current.value.trim() === "") {
        deleteNote();
      } else {
        saveNote(ref.current.value);
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        ref={ref}
        id="memo"
        style={{ caretColor: "#3B82F6" }}
        className="w-full text-lg sm:text-xl bg-transparent border-none focus:ring-0 resize-none"
        defaultValue={props.content}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
        autoFocus
      />
    </label>
  );
};
