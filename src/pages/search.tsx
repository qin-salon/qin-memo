import { ChevronLeftIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import type { DOMAttributes } from "react";
import { useState } from "react";
import { SearchHistories } from "src/components/SearchHistories";
import { SearchResults } from "src/components/SearchResults";
import { InputText } from "src/components/shared/InputText";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleChange: DOMAttributes<HTMLInputElement>["onChange"] = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = async (e) => {
    e.preventDefault();
    setKeyword(value);
    const req: Pick<SearchHistoryType, "keyword"> = { keyword };
    await fetch(`/users/${user.id}/searchHistories`, {
      method: "post",
      body: JSON.stringify(req),
    });
  };

  const handleClose = () => {
    setValue("");
    setKeyword("");
  };

  return (
    <div className="py-4 px-2 mx-auto space-y-7 max-w-screen-sm sm:px-4">
      <header className="flex items-center space-x-1">
        <Link href="/users/foo">
          <a className="grid place-items-center w-10 h-10">
            <ChevronLeftIcon className="w-6 h-6" />
          </a>
        </Link>

        <form className="flex-1" onSubmit={handleSubmit}>
          <InputText
            className="w-full"
            startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6 text-gray-200" />}
            placeholder="検索"
            value={value}
            onChange={handleChange}
          />
        </form>

        <button className="grid place-items-center w-10 h-10" onClick={handleClose}>
          <XIcon className="w-6 h-6" />
        </button>
      </header>

      <div>{keyword === "" ? <SearchHistories /> : <SearchResults keyword={keyword} />}</div>
    </div>
  );
};

export default Search;
