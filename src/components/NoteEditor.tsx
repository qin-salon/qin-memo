import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import { useDebouncedCallback } from "use-debounce";

export const NoteEditor = (props: NoteType) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const authUser = useAuthUser();

  const saveNote = useCallback(
    async (value: string) => {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/v1/notes/${props.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ content: value.trim() }),
      });
    },
    [authUser, props.id]
  );

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
    if (ref.current?.value) {
      await saveNote(ref.current.value);
    }
  }, [saveNote]);

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (ref.current?.value && url === "/") {
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
      />
    </label>
  );
};
