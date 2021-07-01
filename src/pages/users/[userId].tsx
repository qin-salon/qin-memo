import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { UserNoteList } from "src/components/NoteList";
import { useUser, withUser } from "src/components/providers/UserProvider";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import type { NoteType } from "src/types/types";

const UsersUserId: NextPage = () => {
  const authUser = useAuthUser();
  const router = useRouter();
  const { user } = useUser();
  const handleCreateMemo = useCallback(async () => {
    try {
      if (!user?.id) return;
      const idToken = await authUser.getIdToken();
      const res = await fetch(`/api/proxy/v1/users/${user.id}/notes`, {
        method: "POST",
        headers: { authorization: `Bearer ${idToken}` },
      });
      // TODO: typeguard
      const data: NoteType = await res.json();
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
          <div className="flex flex-col">
            <span className="font-bold">{user?.name}</span>
          </div>
        </div>

        <Link href="/search">
          <a className="block">
            <InputSearch placeholder="メモを検索する" />
          </a>
        </Link>

        {/* TODO:修正必要かも */}
        {user ? <UserNoteList userId={user?.id} /> : null}
      </div>
    </Layout>
  );
};

export default withUser(UsersUserId);
