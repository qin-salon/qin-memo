import { SearchIcon, XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import type { DOMAttributes } from "react";
import { useState } from "react";
import { SearchHistories } from "src/components/SearchHistories";
import { SearchResults } from "src/components/SearchResults";
import { Header } from "src/components/shared/Header";
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
      <Header
        left="back"
        center={
          <form className="flex-1" onSubmit={handleSubmit}>
            <InputText
              className="w-full"
              startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6 text-gray-200" />}
              placeholder="検索"
              value={value}
              onChange={handleChange}
            />
          </form>
        }
        right={[
          <button key="delete" type="button" className="grid place-items-center w-9 h-9" onClick={handleClose}>
            <XIcon className="w-5 h-5" />
          </button>,
        ]}
      />

      <div>{keyword === "" ? <SearchHistories /> : <SearchResults keyword={keyword} />}</div>
    </div>
  );
};

export default Search;
