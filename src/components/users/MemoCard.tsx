import Link from "next/link";
import type { VFC } from "react";
import type { ListNoteType } from "src/types/types";

type MemoCardProps = { note: ListNoteType };

// タイトルの取得（改行コードまでをタイトルとする）
const pattarn = "(^.*)(\n)";
const getTitle = (excTitle: RegExpMatchArray | null) => {
  return String(excTitle ? excTitle[0] : "");
};

export const MemoCard: VFC<MemoCardProps> = (props) => {
  const title = getTitle(props.note.excerpt.match(pattarn));

  return (
    <Link href={`/notes/${props.note.id}`}>
      <a className="block py-3 px-6 w-full bg-gray-100 rounded-xl shadow">
        <div className="font-bold truncate">{title}</div>
        <div className="text-sm mt-0.5 truncate">{props.note.excerpt.replace(title, "")}</div>

        <div className="flex justify-between items-center mt-4">
          <time className="text-sm font-bold text-gray-400">{props.note.updatedOn}</time>
          {props.note.public ? (
            <div className="text-xs font-bold py-1 px-2.5 text-white bg-orange-400 rounded-full">公開中</div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
