import type { NoteWithUserType } from "src/api/handler/note/type";

export const NoteViewer = (props: NoteWithUserType) => {
  return <p className="text-lg leading-loose">{props.content}</p>;
};
