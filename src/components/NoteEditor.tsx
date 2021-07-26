import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import { useDebouncedCallback } from "use-debounce";

export const NoteEditor = (props: NoteType) => {
  const authUser = useAuthUser();

  const debounced = useDebouncedCallback(async (value) => {
    try {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/v1/notaes/${props.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ content: value.trim() }),
      });
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

  return (
    <label htmlFor="memo" className="block">
      <TextareaAutosize
        id="memo"
        style={{ caretColor: "#3B82F6" }}
        className="w-full text-lg sm:text-xl bg-transparent border-none focus:ring-0 resize-none"
        defaultValue={props.content}
        onChange={handleChange}
        placeholder="メモを入力する"
        autoComplete="off"
        minRows={16}
      />
    </label>
  );
};
