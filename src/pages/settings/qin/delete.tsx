import type { NextPage } from "next";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { Button } from "src/components/shared/Buttons";
import { Layout } from "src/components/shared/Layout";
import { RecursiveList } from "src/components/shared/Lists";
import { useUser, withUser } from "src/domains/auth";
import { API_URL } from "src/utils/constants";

const SettingsQinDelete: NextPage = () => {
  const authUser = useAuthUser();
  const { user } = useUser();

  const handleDeleteQinMemo = useCallback(async () => {
    try {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/v1/users/${user?.id}/service`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${idToken}` },
      });
      await authUser.signOut();
    } catch (error) {
      console.error(error);
    }
  }, [authUser, user?.id]);

  const handleDeleteQinAccount = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/users/${user?.id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await authUser.signOut();
  }, [authUser, user?.id]);

  return (
    <Layout left="back" center="account">
      <h1 className="text-xl font-bold">データの削除</h1>

      <div className="mt-8">
        <RecursiveList
          list={[
            {
              title: "Qinサービスの削除",
              items: [
                {
                  label: "Qin Memoを削除",
                  button: (
                    <Button
                      variant="solid-gray"
                      className="py-2 px-5 text-sm text-red-500"
                      onClick={handleDeleteQinMemo}
                    >
                      削除する
                    </Button>
                  ),
                },
              ],
            },
            {
              title: "Qinアカウントの削除",
              items: [
                {
                  label: "アカウントを削除",
                  button: (
                    <Button
                      variant="solid-gray"
                      className="py-2 px-5 text-sm text-red-500"
                      onClick={handleDeleteQinAccount}
                    >
                      削除する
                    </Button>
                  ),
                },
              ],
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default withUser(SettingsQinDelete);
