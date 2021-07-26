import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";

export const NoteEditor = (props: NoteType) => {
  const authUser = useAuthUser();
  const [content, setContent] = useState(props.content);

  const handleChangeContent = useCallback(
    async (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.currentTarget.value);
      try {
        const idToken = await authUser.getIdToken();
        await fetch(`${API_URL}/v1/notes/${props.id}`, {
          method: "PUT",
          headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [authUser, content, props.id]
  );

  return (
    <label htmlFor="memo" className="flex h-[calc(100vh-168px)] sm:h-[calc(100vh-192px)] cursor-text">
      <TextareaAutosize
        id="memo"
        style={{ caretColor: "#3B82F6" }}
        className="w-full text-lg sm:text-xl bg-transparent border-none focus:ring-0 resize-none"
        value={content}
        onChange={handleChangeContent}
        placeholder="メモを入力する"
        autoComplete="off"
      />
    </label>
  );
};
