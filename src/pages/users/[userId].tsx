import { SearchIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { Header } from "src/components/shared/Header";
import { InputText } from "src/components/shared/InputText";
import { MemoCard } from "src/components/users/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNoteType } from "src/types/types";
import useSWR from "swr";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const User: NextPage = () => {
  const { data: listNote, error } = useSWR<ListNoteType[]>(`/users/${user.id}/notes`);

  return (
    <div className="flex overscroll-none flex-col h-screen">
      <Header />

      <div className="w-10/12 lg:w-1/2 mx-auto">
        <div className="flex flex-row my-4">
          <div className="flex flex-col">
            <Avatar alt={user.name} src={user.avatarUrl} className="w-12 h-12" />
          </div>
          <div className="flex flex-col">
            <span className="my-0 ml-2">{user.name}</span>
            <Button linkProps={{ href: "/settings/profile" }} size="extrasmall" bgColor="transparent" textColor="blue">
              プロフィール設定
            </Button>
          </div>
        </div>
        <div className="block lg:hidden">
          <InputText startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6" />} placeholder="メモを検索する" />
        </div>
        {error ? <div>メモが登録されていません</div> : null}
        {listNote ? (
          <div className="flex flex-col w-full h-full">
            {listNote.map((note: ListNoteType) => {
              return <MemoCard key={note.id} note={note} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default User;
