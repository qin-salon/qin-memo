import type { VFC } from "react";
import { MemoCard } from "src/components/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNoteType } from "src/types/types";
import useSWR from "swr";

type Props = { keyword: string };

const user = EXAMPLE_USER_01;

export const SearchResults: VFC<Props> = (props) => {
  const { data, error } = useSWR(`/users/${user.id}/notes/search/${props.keyword}`);

  if (error) {
    // TODO: 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // TODO: 検索結果取得時のローディング処理
    return <div>loading</div>;
  }

  if (data.length === 0) {
    // TODO
    return (
      <div>
        <strong>{props.keyword}</strong>に一致するメモは見つかりませんでした。
      </div>
    );
  }

  return (
    <ul className="space-y-5">
      {data.map((note: ListNoteType) => {
        return (
          <li key={note.id}>
            <MemoCard note={note} />
          </li>
        );
      })}
    </ul>
  );
};
