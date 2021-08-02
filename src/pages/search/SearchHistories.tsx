import { XIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import type { SearchHistoryType } from "src/api/handler/searchHistory/type";
import { Error } from "src/components/Error";

type SearchHistoriesProps = {
  data?: SearchHistoryType[];
  error?: Error;
  onClickItem: (keyword: string) => Promise<void>;
  onDeleteHistory: (id: number) => Promise<void>;
};

export const SearchHistories: VFC<SearchHistoriesProps> = (props) => {
  if (props.error) {
    return <Error />;
  }

  if (!props.data) {
    return null;
  }

  return (
    <ul className="space-y-1">
      {props.data.map((item) => {
        const handleClickItem = () => {
          return props.onClickItem(item.keyword);
        };
        const handleDelete = () => {
          return props.onDeleteHistory(item.id);
        };
        return (
          <li key={item.id} className="flex items-center">
            <button type="button" className="flex-1 p-2.5 text-left" onClick={handleClickItem}>
              {item.keyword}
            </button>
            <button type="button" className="grid flex-shrink-0 place-items-center w-9 h-9" onClick={handleDelete}>
              <XIcon className="w-5 h-5 text-gray-300" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
