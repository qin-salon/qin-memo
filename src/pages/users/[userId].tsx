import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { MemoCard } from "src/components/users/MemoCard";
import { UserHeader } from "src/components/users/userHeader";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNote } from "src/types/types";

import { fetcher, userUrl } from "../../lib/api";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはずで
const user = EXAMPLE_USER_01;

const User: NextPage = () => {
  const [listNote, setListNote] = useState<ListNote[]>([]);

  useEffect(() => {
    const fetchBootLoader = async () => {
      const listNote = await fetcher<ListNote[]>(`${userUrl}/${user.id}/notes/`);
      setListNote(listNote);
    };
    fetchBootLoader();
  }, []);

  return (
    <div className="flex flex-col overscroll-none h-screen">
      <header>
        <UserHeader />
      </header>
      <div className="w-1/2 mx-auto">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Avatar alt={user.name} src={user.avatarUrl} size="medium" />
          </div>
          <div className="flex flex-col">
            <span className="ml-2 my-0">{user.name}</span>
            <Button linkProps={{ href: "/settings/profile" }} size="extrasmall" bgColor="transparent">
              プロフィール設定
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col h-full">
          {listNote.map((note: ListNote) => {
            return <MemoCard key={note.id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default User;
