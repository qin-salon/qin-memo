import { XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useAuthUser } from "next-firebase-auth";
import type { FormEvent, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { NoteList } from "src/components/NoteList";
import { SearchHistories } from "src/components/SearchHistories";
import { Button } from "src/components/shared/Buttons";
import { Search } from "src/components/shared/Forms";
import { Layout } from "src/components/shared/Layout";
import { useUser, withUser } from "src/contexts/user";
import type { ListNoteType, SearchHistoryType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import useSWR from "swr";

type NotesState = { data?: ListNoteType[]; error?: Error };

const SearchPage: NextPage = () => {
  const authUser = useAuthUser();
  const { user } = useUser();
  const ref = useRef<HTMLInputElement>(null);
  const [notes, setNotes] = useState<NotesState | undefined>();
  const {
    data: histories,
    error: historiesError,
    mutate,
  } = useSWR<SearchHistoryType[]>(user?.id ? `${API_URL}/v1/users/${user.id}/searchHistories` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleClose = useCallback((_e: MouseEvent<HTMLButtonElement>) => {
    setNotes(undefined);
    if (!ref.current) return;
    ref.current.value = "";
    ref.current.focus();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user) return;
      const keyword = ref.current?.value.trim();
      if (!keyword) {
        setNotes(undefined);
        return;
      }
      try {
        const idToken = await authUser.getIdToken();
        const res = await fetch(`${API_URL}/v1/users/${user.id}/notes/search?q=${keyword}`, {
          headers: { authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        setNotes({ data, error: undefined });
        mutate(async (histories) => {
          const res = await fetch(`${API_URL}/v1/users/${user.id}/searchHistories`, {
            method: "post",
            headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
            body: JSON.stringify({ keyword }),
          });
          const data: SearchHistoryType = await res.json();
          if (!histories) return [data];
          return [data, ...histories];
        }, false);
      } catch (error) {
        setNotes((prevData) => {
          return { ...prevData, error };
        });
        console.error(error);
      }
    },
    [authUser, mutate, user]
  );

  const handleClickItem = useCallback(
    async (keyword: string) => {
      if (!user || !ref.current) return;
      ref.current.value = keyword;
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/v1/users/${user.id}/notes/search?q=${keyword}`, {
        headers: { authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setNotes({ data, error: undefined });
    },
    [authUser, user]
  );

  const handleDeleteHistory = async (id: number) => {
    mutate((data) => {
      return data?.filter((item) => {
        return item.id !== id;
      });
    }, false);
    const idToken = await authUser.getIdToken();
    fetch(`${API_URL}/v1/searchHistories/${id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
  };

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
