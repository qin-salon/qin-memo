import type { NextPage } from "next";
import { Button } from "src/component/Button";
import { InputConfirmDialog } from "src/component/Dialog";
import { Layout } from "src/component/Layout";
import { RecursiveList } from "src/component/List";
import { withUser } from "src/context/user";

import { useDeleteDialog } from "./useDelete";

const SettingsQinDelete: NextPage = () => {
  const {
    isShowDeleteQinMemo,
    handleDeleteQinMemo,
    handleOpenDeleteQinMemoDialog,
    handleCloseDeleteQinMemoDialog,
    isShowDeleteQinAccount,
    handleDeleteQinAccount,
    handleOpenDeleteQinAccountDialog,
    handleCloseDeleteQinAccountDialog,
  } = useDeleteDialog();

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
                      onClick={handleOpenDeleteQinMemoDialog}
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
                  label: "アカウントごと削除する",
                  button: (
                    <Button
                      variant="solid-gray"
                      className="py-2 px-5 text-sm text-red-500"
                      onClick={handleOpenDeleteQinAccountDialog}
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

      <InputConfirmDialog
        show={isShowDeleteQinMemo}
        onClose={handleCloseDeleteQinMemoDialog}
        onClickOk={handleDeleteQinMemo}
        title="Qin Memoを削除"
        buttonText="削除する"
      />

      <InputConfirmDialog
        show={isShowDeleteQinAccount}
        onClose={handleCloseDeleteQinAccountDialog}
        onClickOk={handleDeleteQinAccount}
        title="Qinアカウントの削除"
        buttonText="削除する"
      />
    </Layout>
  );
};

export default withUser(SettingsQinDelete);
