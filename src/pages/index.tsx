import type { NextPage } from "next";
import Link from "next/link";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType } from "src/api/handler/note/type";
import { NoteList } from "src/components/NoteList";
import { NoteWriteButton } from "src/components/NoteWriteButton";
import { Avatar } from "src/components/shared/Avatar";
import { Search } from "src/components/shared/Forms";
import { Layout } from "src/components/shared/Layout";
import { useUser, withUser } from "src/contexts/user";
import useSWR from "swr";

const Index: NextPage = () => {
  const { user } = useUser();
  const { data, error } = useSWR<ListNoteType[]>(`${API_URL}/notes`);

  return (
    <Layout left="memo" right={[<NoteWriteButton key="write" />, "profile"]}>
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar
            src={user?.avatarUrl}
            alt={user?.name}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
          />
          {user?.name ? (
            <div className="flex flex-col">
              <span className="font-bold">{user.name}</span>
              <Link href="/settings/qin/user/edit">
                <a className="text-sm font-bold text-blue-500 hover:underline">プロフィール設定</a>
              </Link>
            </div>
          ) : null}
        </div>
        <Link href="/search">
          <a className="block rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
            <Search placeholder="メモを検索する" disabled />
          </a>
        </Link>

        <NoteList {...{ data, error }} />
      </div>
    </Layout>
  );
};

export default withUser(Index);
