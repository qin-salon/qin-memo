import type { NextPage } from "next";
import Link from "next/link";
import { UserNoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Index: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Button key="write memo" variant="solid-blue" linkProps={{ href: "/memos/new" }} className="px-4 h-9">
          メモを書く
        </Button>,
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
          <a className="block rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <InputSearch placeholder="メモを検索する" disabled />
          </a>
        </Link>

        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
