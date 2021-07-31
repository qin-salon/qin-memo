import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { Suspense, useCallback } from "react";
import { NoteListSuspense } from "src/components/NoteListSuspense";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Buttons";
import { Search } from "src/components/shared/Forms";
import { Layout } from "src/components/shared/Layout";
import { useUser, withUser } from "src/contexts/user";
import { isNoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";

const Index: NextPage = () => {
  const router = useRouter();
  const authUser = useAuthUser();
  const { user } = useUser();

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

        <Suspense fallback={<Loading />}>
          <NoteListSuspense id={user?.id} />
        </Suspense>
      </div>
    </Layout>
  );
};

const Loading = () => {
  return (
    <ul className="space-y-5">
      {[1, 2, 3, 4, 5].map((v) => {
        return (
          <li key={v} className="py-4 px-4 sm:px-6 w-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow animate-pulse">
            <div className="w-3/4 h-3.5 sm:h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="mt-2.5 h-3.5 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="mt-6 w-16 h-3.5 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </li>
        );
      })}
    </ul>
  );
};

export default withUser(Index);
