import { XIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";
import useSWR from "swr";

const user = EXAMPLE_USER_01;

export const SearchHistories: VFC = () => {
  const { data, error, mutate } = useSWR<SearchHistoryType[]>(`/users/${user.id}/searchHistories`);

  if (error) {
    // TODO: 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // TODO: 検索結果取得時のローディング処理
    return null;
  }

  return (
    <ul className="space-y-1">
      {data.map((serchHistory) => {
        const handleHistoryClick = async () => {
          // TODO: 検索結果のアイテムをクリックしたときの処理
          alert(`${serchHistory.keyword}で検索`);
        };

        // ===================================
        // 検索履歴の削除
        // ===================================
        const handleHistoryDeleteClick = async () => {
          // deleteメソッド
          await fetch(`/users/${user.id}/searchHistories/${serchHistory.id}`, {
            method: "delete",
          });
          // 検索履歴を取得し直す
          await mutate();
        };

        return (
          <li key={serchHistory.id}>
            <div className="flex">
              <div className="flex-1 my-auto p-2 pl-6 rounded-full hover:bg-gray-100 ">
                <Button
                  button
                  className="w-full"
                  bgColor="transparent"
                  textColor="black"
                  size="extrasmall"
                  justifyContent="justify-start"
                  onClick={handleHistoryClick}
                >
                  <strong>
                    <span className="my-auto">{serchHistory.keyword}</span>
                  </strong>
                </Button>
              </div>
              <Button
                button
                className="hover:bg-gray-100 rounded-full"
                bgColor="transparent"
                textColor="black"
                size="extrasmall"
                onClick={handleHistoryDeleteClick}
              >
                <XIcon className="text-gray-300 my-2 w-6 h-6" />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
