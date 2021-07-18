import type { VFC } from "react";
import { NoteListItem } from "src/components/NoteListItem";
import { Error } from "src/components/shared/Error";
import type { ListNoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import type { SWRResponse } from "swr";
import useSWR from "swr";

type NoteListProps = SWRResponse<ListNoteType[], any>;

const NoteList: VFC<NoteListProps> = (props) => {
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
              className="py-3 px-4 sm:px-6 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow animate-pulse"
            >
              <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="mt-3 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="mt-6 w-1/6 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
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
            <NoteListItem note={note} />
          </li>
        );
      })}
    </ul>
  );
};

export const UserNoteList: VFC<{ userId: string }> = (props) => {
  const res = useSWR<ListNoteType[]>(`${API_URL}/v1/users/${props.userId}/notes`);
  return <NoteList {...res} />;
};

export const SearchNoteList: VFC<{ userId: string; keyword: string }> = (props) => {
  const res = useSWR(`${API_URL}/v1/users/${props.userId}/notes/search?q=${props.keyword}`);
  return <NoteList {...res} />;
};
