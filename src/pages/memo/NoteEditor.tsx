import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType, NoteWithUserType } from "src/api/handler/note/type";
import { mutate } from "swr";
import { useDebouncedCallback } from "use-debounce";

export const NoteEditor = (props: NoteWithUserType) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const authUser = useAuthUser();

  const saveNote = useCallback(
    async (value: string) => {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/notes/${props.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ content: value.trim() }),
      });
      await mutate(`${API_URL}/users/${props.users.id}/notes`);
    },
    [authUser, props.id, props.users.id]
  );

  const deleteNote = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/notes/${props.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await mutate(
      `${API_URL}/users/${props.users.id}/notes`,
      (data: ListNoteType[]) => {
        if (!data) return;
        return data.filter(({ id }) => {
          return id !== props.id;
        });
      },
      false
    );
  }, [authUser, props.id, props.users.id]);

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
      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleBlur = useCallback(async () => {
    const val = ref.current?.value;
    if (val === undefined || (val.trim() !== "" && val === props.content)) {
      return;
    }
    if (val.trim() === "") {
      await deleteNote();
    } else {
      await saveNote(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteNote, saveNote]);

  useEffect(() => {
    router.beforePopState(({ url }) => {
      const val = ref.current?.value;
      if (url !== "/" || val === undefined || (val.trim() !== "" && val === props.content)) {
        return true;
      }
      if (val.trim() === "") {
        deleteNote();
      } else {
        saveNote(val);
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteNote, saveNote]);

  useEffect(() => {
    if (!props.content || !ref.current) return;
    ref.current.setSelectionRange(props.content.length, props.content.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        ref={ref}
        id="memo"
        className="w-full text-lg leading-loose bg-transparent border-none focus:ring-0 resize-none"
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
