import type { NextPage } from "next";
import Link from "next/link";
import { UserNoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Index: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Link href="/memos/new" key="write memo">
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
            <Link href="/settings/qin/user/edit">
              <a className="text-sm font-bold text-blue-500 hover:underline">プロフィール設定</a>
            </Link>
          </div>
        </div>

        <Link href="/search">
          <a className="block">
            <InputSearch placeholder="メモを検索する" />
          </a>
        </Link>

        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
