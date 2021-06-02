import { XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import { SearchNoteList } from "src/components/NoteList";
import { SearchHistories } from "src/components/SearchHistories";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";

const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setKeyword(value);
      const req: Pick<SearchHistoryType, "keyword"> = { keyword };
      await fetch(`/users/${user.id}/searchHistories`, {
        method: "post",
        body: JSON.stringify(req),
      });
    },
    [keyword, value]
  );

  const handleClose = useCallback(() => {
    setValue("");
    setKeyword("");
  }, []);

  const right = useMemo(() => {
    if (!value) return;
    return [
      <Button key="delete" variant="ghost" className="w-10 h-10" onClick={handleClose}>
        <XIcon className="w-5 h-5" />
      </Button>,
    ];
  }, [handleClose, value]);

  return (
    <Layout
      isHeaderNarrow
      left="back"
      center={
        <form className="flex-1" onSubmit={handleSubmit}>
          <InputSearch placeholder="検索" value={value} onChange={handleChange} autoFocus />
        </form>
      }
      right={right}
    >
      {keyword === "" ? <SearchHistories /> : <SearchNoteList userId={user.id} keyword={keyword} />}
    </Layout>
  );
};

export default Search;
