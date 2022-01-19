import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEventHandler, FocusEventHandler, VFC } from "react";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType, NoteType, NoteTypeWithExcerpt } from "src/api/handler/note/type";
import { useUser } from "src/util/user";
import { useSWRConfig } from "swr";
import { useDebouncedCallback } from "use-debounce";

/**
 * @package
 */
export const Textarea: VFC<{ note: NoteType }> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { saveNote, handleChange, handleBlur } = useNote(props.note);

  const handleWindowClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    saveNote(ref.current?.value);
  };
  const handleRouteChange = () => {
    saveNote(ref.current?.value);
  };

  useEffect(() => {
    if (window) window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      if (window) window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        ref={ref}
        id="memo"
        className="w-full text-lg leading-loose bg-transparent border-none focus:ring-0 resize-none"
        defaultValue={props.note.content}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
        autoFocus={props.note.content === ""}
      />
    </label>
  );
};

const useNote = (note: NoteType) => {
  const authUser = useAuthUser();
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const saveNote = useCallback(
    async (value?: string) => {
      if (!user) return;
      if (value && value === note.content) return;
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/notes/${note.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ content: value ? value.trim() : "" }),
      });
      const updatedNote: NoteTypeWithExcerpt | undefined = await res.json();
      await mutate(
        `${API_URL}/notes`,
        async (notes: ListNoteType[]) => {
          if (notes && updatedNote) {
            return [
              updatedNote,
              ...notes.filter((note) => {
                return note.id !== updatedNote.id;
              }),
            ];
          }
          const res = await fetch(`${API_URL}/notes`, { headers: { authorization: `Bearer ${idToken}` } });
          const data = await res.json();
          return data;
        },
        false
      );
    },
    [authUser, mutate, note, user]
  );

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await saveNote(value);
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      saveNote(e.currentTarget.value);
    },
    [saveNote]
  );

  return { saveNote, handleChange, handleBlur };
};
