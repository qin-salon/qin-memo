import type { VFC } from "react";
import type { ListNoteType } from "src/api/handler/note/type";
import { NoteListItem } from "src/components/NoteListItem";
import { Error } from "src/components/shared/Error";

type NoteListProps = { data?: ListNoteType[]; error?: Error };

export const NoteList: VFC<NoteListProps> = (props) => {
  if (props.error) {
    return <Error />;
  }

  if (!props.data) {
    return (
      <ul className="space-y-5">
        {[1, 2, 3, 4, 5].map((v) => {
          return (
            <li
              key={v}
              className="py-4 px-4 sm:px-6 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow animate-pulse"
            >
              <div className="w-3/4 h-3.5 sm:h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
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
        if (!note.excerpt) return null;

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
