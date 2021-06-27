import type { NextPage } from "next";
import Link from "next/link";
import { UserNoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_02 } from "src/models/user";

const user = EXAMPLE_USER_02;

const UsersUserId: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Button key="write memo" variant="solid-blue" linkProps={{ href: "/memos/new" }} className="px-4 h-10">
          メモを書く
        </Button>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar
            src={user.avatarUrl}
            alt={user.name}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
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

export default UsersUserId;
