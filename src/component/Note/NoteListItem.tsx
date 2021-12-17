import Link from "next/link";
import type { VFC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { getFirstAndSecondLine } from "src/util/string";

import { format_yyyyMd } from "./date";

/**
 * @package
 */
export const NoteListItem: VFC<ListNoteType> = (props) => {
  const [first, second] = getFirstAndSecondLine(props.excerpt);

  return (
    <Link href={`/memo/${props.id}`}>
      <a className="block py-3 px-4 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow sm:px-6">
        <div>
          <h1 className="text-sm font-bold leading-relaxed truncate sm:text-base">{first}</h1>
          <p className="text-sm leading-relaxed truncate">{second}</p>
        </div>
        <div className="flex justify-between items-end mt-4 h-6">
          <time className="space-x-4 text-sm font-bold tracking-wide text-gray-400">
            {format_yyyyMd(props.updatedAt)}
          </time>
          {props.isPublic ? (
            <div className="grid place-content-center px-2.5 h-full text-xs font-bold text-white bg-orange-400 rounded-full">
              公開中
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
