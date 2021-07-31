import type { VFC } from "react";
import { fetch } from "react-fetch";
import { NoteListItem } from "src/components/NoteListItem";
import type { ListNoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import useSWR from "swr";

type NoteListProps = { id?: string };

export const NoteListSuspense: VFC<NoteListProps> = (props) => {
  const { data } = useSWR<ListNoteType[]>(props?.id ? `${API_URL}/v1/users/${props.id}/notes` : null, fetch, {
    suspense: true,
  });

  return (
    <ul className="space-y-5">
      {(data ?? []).map((note) => {
        return (
          <li key={note.id}>
            <NoteListItem {...note} />
          </li>
        );
      })}
    </ul>
  );
};
