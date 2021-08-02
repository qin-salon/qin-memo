import Link from "next/link";
import type { VFC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { format_yyyyMd } from "src/utils/date";

// Get first and second line of string
const getFirstAndSecondLine = (str: string) => {
  const [first, second] = str.split("\n").filter(Boolean);
  return [first, second || "\u00A0"];
};

/**
 * @package
 */
export const NoteListItem: VFC<ListNoteType> = (props) => {
  const [first, second] = getFirstAndSecondLine(props.excerpt);

  return (
    <Link href={`/memos/${props.id}`}>
      <a className="block py-3 px-4 sm:px-6 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
        {first.length > 120 ? (
          <div className="line-clamp-2">
            <h1 className="text-sm sm:first-line:text-base first-line:font-bold leading-relaxed">{props.excerpt}</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm sm:text-base font-bold leading-relaxed truncate">{first}</h1>
            <p className="text-sm leading-relaxed truncate">{second}</p>
          </div>
        )}
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
  );
};
