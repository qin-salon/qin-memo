import { XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { Button } from "src/component/Button";
import { Search } from "src/component/Form";
import { Layout } from "src/component/Layout";
import { NoteList } from "src/component/Note";
import { withUser } from "src/context/user";

import { SearchHistories } from "./SearchHistories";
import { useSearch } from "./useSearch";

const SearchPage: NextPage = () => {
  const {
    inputRef,
    buttonRef,
    notes,
    handleClose,
    handleSubmit,
    handleClickItem,
    handleDeleteHistory,
    histories,
    historiesError,
  } = useSearch();

  return (
    <Layout
      isHeaderNarrow
      left="back"
      center={
        <form className="flex-1" onSubmit={handleSubmit}>
          <Search ref={inputRef} placeholder="検索" autoFocus />
        </form>
      }
      right={
        notes
          ? [
              <Button ref={buttonRef} key="delete" variant="ghost" className="w-10 h-10" onClick={handleClose}>
                <XIcon className="w-5 h-5" />
              </Button>,
            ]
          : undefined
      }
    >
      {notes ? (
        <NoteList {...notes} />
      ) : (
        <SearchHistories
          data={histories}
          error={historiesError}
          onClickItem={handleClickItem}
          onDeleteHistory={handleDeleteHistory}
        />
      )}
    </Layout>
  );
};

export default withUser(SearchPage);
