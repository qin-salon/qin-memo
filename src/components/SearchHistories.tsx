import { XIcon } from "@heroicons/react/outline";
import { useAuthUser } from "next-firebase-auth";
import type { Dispatch, SetStateAction, VFC } from "react";
import { Error } from "src/components/shared/Error";
import { useUser } from "src/contexts/user";
import type { SearchHistoryType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import type { SWRResponse } from "swr";
import useSWR from "swr";

type SearchHistoriesProps = {
  setKeyword: Dispatch<SetStateAction<string>>;
};

export const SearchHistories: VFC<SearchHistoriesProps> = (props) => {
  const { user } = useUser();
  const { data, error, mutate } = useSWR<SearchHistoryType[]>(`${API_URL}/v1/users/${user?.id}/searchHistories`);

  if (error) {
    return <Error />;
  }

  if (!data) {
    return null;
  }

  return (
    <ul className="space-y-1">
      {data.map((searchHistory) => {
        return (
          <li key={searchHistory.id}>
            <HistoryItem {...searchHistory} mutate={mutate} setKeyword={props.setKeyword} />
          </li>
        );
      })}
    </ul>
  );
};

type HistoryItemProps = SearchHistoryType & { mutate: SWRResponse<SearchHistoryType[], Error>["mutate"] } & {
  setKeyword: Dispatch<SetStateAction<string>>;
};

const HistoryItem: VFC<HistoryItemProps> = (props) => {
  const authUser = useAuthUser();
  const handleHistoryClick = async () => {
    props.setKeyword(props.keyword);
  };

  const handleHistoryDeleteClick = async () => {
    // deleteメソッド
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/searchHistories/${props.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
    // 検索履歴を取得し直す
    await props.mutate();
  };

  return (
    <div className="flex items-center">
      <button type="button" className="flex-1 p-2.5 text-left" onClick={handleHistoryClick}>
        {props.keyword}
      </button>
      <button
        type="button"
        className="grid flex-shrink-0 place-items-center w-9 h-9"
        onClick={handleHistoryDeleteClick}
      >
        <XIcon className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
};
