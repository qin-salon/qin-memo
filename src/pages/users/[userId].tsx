import type { NextPage } from "next";
import { LogoIcon } from "src/components/icon/LogoIcon";
import { SearchIcon } from "src/components/icon/SearchIcon";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { MemoCard } from "src/components/users/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNote } from "src/types/types";
import useSWR from "swr";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const User: NextPage = () => {
  const { data: listNote, error } = useSWR<ListNote[]>(`/users/${user.id}/notes`);

  return (
    <div className="flex flex-col overscroll-none h-screen">
      <header>
        <div className="w-10/12 lg:w-auto mx-auto flex flex-col">
          <div className="flex flex-row items-center">
            <div className="flex-1">
              <div className="flex lg:justify-end mr-4">
                <LogoIcon />
              </div>
            </div>
            <div className="hidden lg:block flex-1 my-auto mx-16">
              <InputText startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6" />} placeholder="メモを検索する" />
            </div>
            <div className="flex-1">
              <div className="flex flex-row justify-end lg:justify-start">
                <div className="ml-4">
                  <Button button>メモを書く</Button>
                </div>
                <div className="my-auto">
                  <Avatar alt={user.name} src={user.avatarUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-10/12 lg:w-1/2 mx-auto">
        <div className="flex flex-row my-4">
          <div className="flex flex-col">
            <Avatar alt={user.name} src={user.avatarUrl} size="medium" />
          </div>
          <div className="flex flex-col">
            <span className="ml-2 my-0">{user.name}</span>
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
          <div className="w-full flex flex-col h-full">
            {listNote.map((note: ListNote) => {
              return <MemoCard key={note.id} note={note} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default User;
