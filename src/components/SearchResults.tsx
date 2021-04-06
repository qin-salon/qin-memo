import type { VFC } from "react";
import { MemoCard } from "src/components/users/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNote } from "src/types/types";
import useSWR from "swr";

type Props = { keyword: string };

const user = EXAMPLE_USER_01;

export const SearchResults: VFC<Props> = (props) => {
  const { data } = useSWR<ListNote[]>(`/users/${user.id}/notes`);

  if (!data) {
    return (
      <div>
        {props.keyword ? (
          <div>
            <strong>{props.keyword}</strong>に一致するメモは見つかりませんでした。
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {data.map((note: ListNote) => {
        return (
          <li key={note.id}>
            <MemoCard note={note} />
          </li>
        );
      })}
    </ul>
  );
};
