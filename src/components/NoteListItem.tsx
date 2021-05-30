import Link from "next/link";
import type { VFC } from "react";
import type { ListNoteType } from "src/types/types";

type NoteListItemProps = { note: ListNoteType };

// タイトルの取得（改行コードまでをタイトルとする）
const pattarn = "(^.*)(\n)";
const getTitle = (excTitle: RegExpMatchArray | null) => {
  return String(excTitle ? excTitle[0] : "");
};

export const NoteListItem: VFC<NoteListItemProps> = (props) => {
  const title = getTitle(props.note.excerpt.match(pattarn));

  return (
    <Link href={`/memos/${props.note.id}`}>
      <a className="block py-3 px-4 sm:px-6 w-full bg-gray-100 rounded-xl shadow">
        <div className="text-sm sm:text-base font-bold truncate">{title}</div>
        <div className="mt-0.5 text-sm truncate">{props.note.excerpt.replace(title, "")}</div>

        <div className="flex justify-between items-center mt-4">
          <time className="text-sm font-bold text-gray-400">{props.note.updatedOn}</time>
          {props.note.public ? (
            <div className="py-1 px-2.5 text-xs font-bold text-white bg-orange-400 rounded-full">公開中</div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
