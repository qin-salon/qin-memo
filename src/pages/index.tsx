import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { NoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Buttons";
import { Search } from "src/components/shared/Forms";
import { Layout } from "src/components/shared/Layout";
import { useUser, withUser } from "src/contexts/user";
import type { ListNoteType } from "src/types/types";
import { isNoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import useSWR from "swr";

const Index: NextPage = () => {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();
  const { data, error } = useSWR<ListNoteType[]>(user?.id ? `${API_URL}/v1/users/${user.id}/notes` : null);

  const handleCreateMemo = useCallback(async () => {
    if (!user?.id) return;
    try {
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/v1/users/${user.id}/notes`, {
        method: "POST",
        headers: { authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (!isNoteType(data)) {
        throw new Error("Failed to create memo");
      }
      await router.push(`/memos/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [authUser, router, user?.id]);

  return (
    <Layout
      left="memo"
      right={[
        <Button key="write memo" variant="solid-blue" onClick={handleCreateMemo} className="px-4 h-10">
          メモを書く
        </Button>,
        "profile",
      ]}
    >
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
