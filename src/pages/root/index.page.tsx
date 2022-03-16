import type { NextPage } from "next";
import Link from "next/link";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType } from "src/api/handler/note/type";
import { Avatar } from "src/component/Avatar";
import { Search } from "src/component/Form";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { Layout } from "src/layout";
import { useUser, withUser } from "src/util/user";
import useSWRImmutable from "swr/immutable";

const Root: NextPage = () => {
  const { user } = useUser();
  const { data, error } = useSWRImmutable<ListNoteType[]>(`${API_URL}/notes`);

  return (
    <Layout left="memo" right={[<NoteWriteButton key="write" />, "profile"]}>
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar
            src={user?.avatarUrl}
            alt={user?.accountName}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
          />
          {user?.accountName ? (
            <div className="flex flex-col">
              <span className="font-bold">{user.accountName}</span>
              <Link href="/setting/qin/user/edit">
                <a className="text-sm font-bold text-blue-500 hover:underline">プロフィール設定</a>
              </Link>
            </div>
          ) : null}
        </div>
        <Link href="/search">
          <a className="block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            <Search placeholder="メモを検索する" disabled />
          </a>
        </Link>

        <NoteList data={data} error={error} />
      </div>
    </Layout>
  );
};

export default withUser(Root);
