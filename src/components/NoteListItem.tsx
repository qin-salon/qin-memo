import Link from "next/link";
import type { VFC } from "react";
import type { ListNoteType } from "src/types/types";
import { format_yyyyMd } from "src/utils/date";

const CHUNK_SIZE = 120; // Number of characters per line

// Get first and second line of string
const getFirstAndSecondLine = (str: string) => {
  const [first, second] = str.split("\n").filter(Boolean);
  if (first.length > CHUNK_SIZE) {
    return [str.slice(0, CHUNK_SIZE / 2), str.slice(CHUNK_SIZE / 2, str.length)];
  }
  return [first, second];
};

export const NoteListItem: VFC<ListNoteType> = (props) => {
  const [first, second] = getFirstAndSecondLine(props.excerpt);

  return (
    <article>
      <Link href={`/memos/${props.id}`}>
        <a className="block py-3 px-4 sm:px-6 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
          <h1 className="text-sm sm:text-base font-bold truncate">{first}</h1>
          <p className="mt-0.5 text-sm truncate">{second || "\u00A0"}</p>
          <div className="flex justify-between items-end mt-4 h-6">
            <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
              {format_yyyyMd(props.updatedOn)}
            </time>
            {props.public ? (
              <div className="grid place-content-center px-2.5 h-full text-xs font-bold text-white bg-orange-400 rounded-full">
                公開中
              </div>
            ) : null}
          </div>
        </a>
      </Link>
    </article>
  );
};
