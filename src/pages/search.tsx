import type { NextPage } from "next";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { SearchIcon } from "src/components/icon/SearchIcon";
import { XIcon } from "src/components/icon/XIcon";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { MemoCard } from "src/components/users/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNote, SearchHistory } from "src/types/types";
import useSWR from "swr";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

function getMaxid(searchHistory: SearchHistory[] | undefined) {
  if (searchHistory) {
    const maxId = Math.max.apply(
      null,
      searchHistory.map((search) => {
        return search.id;
      })
    );
    if (searchHistory.length > maxId) {
      return searchHistory.length + 1;
    } else {
      return maxId + 1;
    }
  } else {
    return 1;
  }
}

const Search: NextPage = () => {
  // 検索履歴の取得
  const { data: searchHistory, mutate: historyMutate } = useSWR<SearchHistory[]>(`/users/${user.id}/searchHistories`);
  // 検索結果
  // ★★★ キーワード検索用のURLがモックにないため、とりあえず自分のノートを取得する
  // ★★★ 最終的にURLを変更する必要がある。
  // ★★★ 検索キーワードをURLに渡す処理が必要
  const { data: listNote, mutate: serachMutate } = useSWR<ListNote[]>(`/users/${user.id}/notes`);

  // 表示切替（False : 検索キーワード入力、True ： 検索結果表示）
  const [mode, setMode] = useState(false);
  const [keyward, setKeyward] = useState("");

  // ===================================
  // 検索キーワード入力
  // ===================================
  const handleKeywardChange = (e: KeyboardEvent<HTMLInputElement>) => {
    setKeyward(e.currentTarget.value);
  };

  // ===================================
  // 検索履歴の登録
  // ===================================
  const handleSubmit = async () => {
    // id の採番
    const id = getMaxid(searchHistory);
    // 登録用のデータ定義
    const req: SearchHistory = { id: id, keyword: keyward };
    // postメソッド
    await fetch(`/users/${user.id}/searchHistories`, {
      method: "post",
      body: JSON.stringify(req),
    });
    // 検索履歴を取得し直す
    await historyMutate();
    await serachMutate();
    await setMode(true);
    await setKeyward("");
  };

  // ===================================
  // 検索履歴の削除
  // ===================================
  const handleHistoryDeleteClick = async (id: number) => {
    // deleteメソッド
    await fetch(`/users/${user.id}/searchHistories/${id}`, {
      method: "delete",
    });
    // 検索履歴を取得し直す
    await historyMutate();
  };

  // ===================================
  // 検索履歴のクリック
  // ===================================
  const handleHistoryClick = async () => {
    // ★★★ 検索キーワードをURLに渡す処理が必要
    await serachMutate();
    await setMode(true);
  };

  // ===================================
  // 検索結果切替
  // ===================================
  const handleCloseClick = () => {
    if (mode) {
      setMode(false);
    }
  };

  // ===================================
  // 検索結果表示
  // ===================================
  const NoteRender = () => {
    if (!listNote) {
      return (
        <div>
          {keyward ? (
            <div>
              <strong>{keyward}</strong>に一致するメモは見つかりませんでした。
            </div>
          ) : null}
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col h-full">
        {listNote.map((note: ListNote) => {
          return <MemoCard key={note.id} note={note} />;
        })}
      </div>
    );
  };
  // ===================================
  // 検索履歴表示
  // ===================================
  const HistoryRender = () => {
    if (!searchHistory) {
      return null;
    }
    return (
      <div className="w-full flex flex-col h-full">
        {searchHistory.map((serchHistory: SearchHistory) => {
          return (
            <div key={serchHistory.id} className="flex flex-row justify-between w-full my-1">
              <div className="my-auto hover:bg-gray-100 w-full p-2 pl-6 rounded-full">
                <Button
                  button
                  className="w-full"
                  bgColor="transparent"
                  textColor="black"
                  size="extrasmall"
                  justifyCenter="justify-start"
                  onClick={() => {
                    handleHistoryClick();
                  }}
                >
                  <strong>
                    <span className="my-auto">{serchHistory.keyword}</span>
                  </strong>
                </Button>
              </div>
              <div>
                <Button
                  button
                  className="hover:bg-gray-100 rounded-full"
                  bgColor="transparent"
                  textColor="black"
                  size="extrasmall"
                  onClick={() => {
                    handleHistoryDeleteClick(serchHistory.id);
                  }}
                >
                  <XIcon className="text-gray-300 my-2 w-6 h-6" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ===================================
  // JSXの本体
  // ===================================
  return (
    <div className="flex flex-col overscroll-none h-screen">
      <header>
        <div className="w-3/5 mx-auto flex flex-col mt-4">
          <div className="flex flex-row items-center">
            <div className="flex-1">
              <div className="flex  mr-4">
                <Button
                  linkProps={{ href: `/users/${user.id}` }}
                  className="hover:bg-gray-100 rounded-full"
                  bgColor="transparent"
                  size="extrasmall"
                >
                  <ChevronLeft />
                </Button>
              </div>
            </div>
            <div className="flex-auto items-center m-0">
              <form
                onSubmit={(e) => {
                  handleSubmit();
                  return e.preventDefault();
                }}
              >
                <InputText
                  className="w-full"
                  startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6 text-gray-200" />}
                  placeholder="検索"
                  value={keyward}
                  onChange={(e: KeyboardEvent<HTMLInputElement>) => {
                    handleKeywardChange(e);
                  }}
                />
              </form>
            </div>
            <div className="flex-1 w-6">
              <div className="flex flex-row justify-end ">
                <Button
                  button
                  className="hover:bg-gray-100 rounded-full"
                  bgColor="transparent"
                  size="extrasmall"
                  onClick={() => {
                    handleCloseClick();
                  }}
                >
                  <XIcon className="my-auto w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-3/5 mx-auto">{mode ? NoteRender() : HistoryRender()}</div>
    </div>
  );
};

export default Search;
