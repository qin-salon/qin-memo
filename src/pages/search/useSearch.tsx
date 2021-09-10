import { useAuthUser } from "next-firebase-auth";
import type { FormEvent, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType } from "src/api/handler/note/type";
import type { SearchHistoryType } from "src/api/handler/searchHistory/type";
import { isSearchHistoryType } from "src/api/handler/searchHistory/type";
import { useUser } from "src/util/user";
import useSWRImmutable from "swr/immutable";

type NotesState = { data?: ListNoteType[]; error?: Error };

export const useSearch = () => {
  const authUser = useAuthUser();
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [notes, setNotes] = useState<NotesState | undefined>();
  const {
    data: histories,
    error: historiesError,
    mutate,
  } = useSWRImmutable<SearchHistoryType[]>(user?.id ? `${API_URL}/users/${user.userName}/searchHistories` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleClose = useCallback((_e: MouseEvent<HTMLButtonElement>) => {
    setNotes(undefined);
    if (!inputRef.current) return;
    inputRef.current.value = "";
    inputRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user) return;
      const keyword = inputRef.current?.value.trim();
      if (!keyword) {
        setNotes(undefined);
        return;
      }
      try {
        const idToken = await authUser.getIdToken();
        const res = await fetch(`${API_URL}/users/${user.userName}/notes/search?q=${keyword}`, {
          headers: { authorization: `Bearer ${idToken}` },
        });

        const data = await res.json();
        setNotes({ data, error: undefined });
        mutate(async (histories) => {
          try {
            const res = await fetch(`${API_URL}/users/${user.userName}/searchHistories`, {
              method: "post",
              headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
              body: JSON.stringify({ keyword }),
            });
            const data = await res.json();
            if (!isSearchHistoryType(data)) {
              throw new Error(data.message);
            }
            if (!histories) return [data];
            const sameKeywordItem = histories.find((history) => {
              return history.keyword === data.keyword;
            });
            if (sameKeywordItem) {
              return [
                sameKeywordItem,
                ...histories.filter((history) => {
                  return history.keyword !== sameKeywordItem.keyword;
                }),
              ];
            }
            return [data, ...histories.slice(0, 9)];
          } catch (error) {
            console.error(error);
            return histories;
          }
        }, false);
      } catch (error) {
        console.error(error);
        setNotes((prevData) => {
          return error instanceof Error ? { ...prevData, error } : prevData;
        });
      }
    },
    [authUser, mutate, user]
  );

  const handleClickItem = useCallback(
    async (keyword: string) => {
      if (!user || !inputRef.current) return;
      inputRef.current.value = keyword;
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/users/${user.userName}/notes/search?q=${keyword}`, {
        headers: { authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setNotes({ data, error: undefined });
      buttonRef.current?.focus();
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
    fetch(`${API_URL}/searchHistories/${id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
  };

  return {
    inputRef,
    buttonRef,
    notes,
    handleClose,
    handleSubmit,
    handleClickItem,
    handleDeleteHistory,
    histories,
    historiesError,
  };
};
