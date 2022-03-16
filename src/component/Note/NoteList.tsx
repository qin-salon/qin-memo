import type { VFC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { Error } from "src/component/Error";

import { NoteListItem } from "./NoteListItem";

type NoteListProps = { data?: ListNoteType[]; error?: Error };

/**
 * @package
 */
export const NoteList: VFC<NoteListProps> = (props) => {
  if (props.error) {
    return <Error />;
  }

  if (!props.data) {
    return (
      <ul className="space-y-5">
        {[1, 2, 3, 4, 5].map((v) => {
          return (
            <li key={v} className="p-4 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow animate-pulse sm:px-6">
              <div className="w-3/4 h-3.5 bg-gray-200 dark:bg-gray-600 rounded sm:h-4"></div>
              <div className="mt-2.5 h-3.5 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="mt-6 w-16 h-3.5 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (props.data.length === 0) {
    return <div>メモは見つかりませんでした。</div>;
  }

  return (
    <ul className="space-y-5">
      {props.data.map((note) => {
        return (
          <li key={note.id}>
            <article>
              <NoteListItem {...note} />
            </article>
          </li>
        );
      })}
    </ul>
  );
};
