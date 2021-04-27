import { XIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";
import type { SWRResponse } from "swr";
import useSWR from "swr";

const user = EXAMPLE_USER_01;

export const SearchHistories: VFC = () => {
  const { data, error, mutate } = useSWR<SearchHistoryType[]>(`/users/${user.id}/searchHistories`);

  if (error) {
    // TODO: 検索結果が取得できなかった場合のエラー処理
    return <div>error</div>;
  }

  if (!data) {
    // TODO: 検索結果取得時のローディング処理
    return <div>loading</div>;
  }

  return (
    <ul className="space-y-1">
      {data.map((serchHistory) => {
        return (
          <li key={serchHistory.id}>
            <HistoryItem {...serchHistory} mutate={mutate} />
          </li>
        );
      })}
    </ul>
  );
};

type HistoryItemProps = SearchHistoryType & { mutate: SWRResponse<SearchHistoryType[], Error>["mutate"] };

const HistoryItem: VFC<HistoryItemProps> = (props) => {
  const handleHistoryClick = async () => {
    // TODO: 検索結果のアイテムをクリックしたときの処理
    alert(`${props.keyword}で検索`);
  };

  const handleHistoryDeleteClick = async () => {
    // deleteメソッド
    await fetch(`/users/${user.id}/searchHistories/${props.id}`, {
      method: "delete",
    });
    // 検索履歴を取得し直す
    await props.mutate();
  };

  return (
    <div className="flex">
      <button className="flex-1 px-2.5 h-10 text-left" onClick={handleHistoryClick}>
        {props.keyword}
      </button>
      <button className="grid flex-shrink-0 place-items-center w-10 h-10" onClick={handleHistoryDeleteClick}>
        <XIcon className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
};
