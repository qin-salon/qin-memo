import type { NextPage } from "next";
import Link from "next/link";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { UserNoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";

const Index: NextPage = () => {
  const authUser = useAuthUser();

  const user = authUser
    ? { id: authUser.id ?? "", name: authUser.displayName ?? "", avatarUrl: authUser.photoURL ?? "" }
    : EXAMPLE_USER_01;

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

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
