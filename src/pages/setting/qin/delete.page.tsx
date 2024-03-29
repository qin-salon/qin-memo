import type { NextPage } from "next";
import { Button } from "src/component/Button";
import { InputConfirmDialog } from "src/component/Dialog";
import { RecursiveList } from "src/component/List";
import { Layout } from "src/layout";
import { withUser } from "src/util/user";

import { useDeleteDialog } from "./useDelete";

const SettingQinDelete: NextPage = () => {
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
              title: "サービスの削除",
              items: [
                {
                  label: "Qin Memoのデータを削除",
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
              title: "アカウントの削除",
              items: [
                {
                  label: "Qinアカウントの削除",
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
        title="Qin Memoのデータを削除"
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

export default withUser(SettingQinDelete);
