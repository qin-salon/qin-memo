import { SearchIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { MemoCard } from "src/components/MemoCard";
import { Avatar } from "src/components/shared/Avatar";
import { InputText } from "src/components/shared/InputText";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNoteType } from "src/types/types";
import useSWR from "swr";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const Index: NextPage = () => {
  const { data: listNote, error } = useSWR<ListNoteType[]>(`/users/${user.id}/notes`);

  return (
    <Layout
      left="memo"
      right={[
        <Link href="/notes/new" key="write memo">
          <a className="grid place-items-center px-4 h-9 text-sm font-bold text-white bg-blue-500 rounded-full">
            メモを書く
          </a>
        </Link>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar alt={user.name} src={user.avatarUrl} className="w-16 h-16" />
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <Link href="/settings/qin/profile">
              <a className="text-sm font-bold text-blue-500 hover:underline">プロフィール設定</a>
            </Link>
          </div>
        </div>

        <Link href="/search">
          <a className="block">
            <InputText
              startIcon={<SearchIcon className="my-auto mr-2 w-5 h-5 text-blue-500" />}
              placeholder="メモを検索する"
            />
          </a>
        </Link>

        {error ? <div>メモが登録されていません</div> : null}

        {listNote ? (
          <ul className="space-y-5">
            {listNote.map((note: ListNoteType) => {
              return (
                <li key={note.id}>
                  <MemoCard note={note} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Layout>
  );
};

export default Index;
