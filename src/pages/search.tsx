import { XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { NoteList } from "src/components/NoteList";
import { SearchHistories } from "src/components/SearchHistories";
import { Button } from "src/components/shared/Buttons";
import { Search } from "src/components/shared/Forms";
import { Layout } from "src/components/shared/Layout";
import { withUser } from "src/contexts/user";
import { useSearch } from "src/contexts/useSearch";

const SearchPage: NextPage = () => {
  const { ref, notes, handleClose, handleSubmit, handleClickItem, handleDeleteHistory, histories, historiesError } =
    useSearch();

  return (
    <Layout
      isHeaderNarrow
      left="back"
      center={
        <form className="flex-1" onSubmit={handleSubmit}>
          <Search ref={ref} placeholder="検索" autoFocus />
        </form>
      }
      right={
        notes
          ? [
              <Button key="delete" variant="ghost" className="w-10 h-10" onClick={handleClose}>
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
