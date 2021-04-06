import type { NextPage } from "next";
import type { DOMAttributes } from "react";
import { useState } from "react";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { SearchIcon } from "src/components/icon/SearchIcon";
import { XIcon } from "src/components/icon/XIcon";
import { SearchHistories } from "src/components/SearchHistories";
import { SearchResults } from "src/components/SearchResults";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistory } from "src/types/types";

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
    const req: Pick<SearchHistory, "keyword"> = { keyword };
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
    <div className="flex flex-col overscroll-none h-screen w-full md:max-w-3xl mx-auto p-4">
      <header>
        <div className="flex items-center space-x-4">
          <Button
            linkProps={{ href: `/users/${user.id}` }}
            className="hover:bg-gray-100 rounded-full"
            bgColor="transparent"
            size="extrasmall"
          >
            <ChevronLeft />
          </Button>
          <form className="flex-1" onSubmit={handleSubmit}>
            <InputText
              className="w-full"
              startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6 text-gray-200" />}
              placeholder="検索"
              value={value}
              onChange={handleChange}
            />
          </form>
          <Button
            button
            className="hover:bg-gray-100 rounded-full"
            bgColor="transparent"
            size="extrasmall"
            onClick={handleClose}
          >
            <XIcon className="my-auto w-6 h-6" />
          </Button>
        </div>
      </header>
      <div className="mt-4">{keyword === "" ? <SearchHistories /> : <SearchResults keyword={keyword} />}</div>
    </div>
  );
};

export default Search;
