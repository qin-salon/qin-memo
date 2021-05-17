import type { VFC } from "react";
import { NoteListItem } from "src/components/NoteListItem";
import type { ListNoteType } from "src/types/types";
import type { SWRResponse } from "swr";
import useSWR from "swr";

type NoteListProps = SWRResponse<ListNoteType[], any>;

const NoteList: VFC<NoteListProps> = (props) => {
  if (props.error) {
    return <div>error</div>;
  }

  if (!props.data) {
    return <div>loading</div>;
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
  const res = useSWR<ListNoteType[]>(`/users/${props.userId}/notes`);
  return <NoteList {...res} />;
};

export const SearchNoteList: VFC<{ userId: string; keyword: string }> = (props) => {
  const res = useSWR(`/users/${props.userId}/notes/search/${props.keyword}`);
  return <NoteList {...res} />;
};
