import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { RecursiveList } from "src/components/shared/List";

const SettingsAccount: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <div className="mx-auto max-w-screen-sm">
        <h1 className="text-xl font-bold">データの削除</h1>

        <div className="mt-8">
          <RecursiveList
            list={[
              {
                title: "Qinサービスの削除",
                items: [
                  {
                    label: "Qin Memoを削除",
                    button: {
                      label: (
                        <div className="py-2 px-5 text-sm font-bold text-red-500 bg-gray-200 rounded-full">
                          削除する
                        </div>
                      ),
                      onClick: () => {
                        alert(123);
                      },
                    },
                  },
                ],
              },
              {
                title: "Qinアカウントの削除",
                items: [
                  {
                    label: "アカウントを削除",
                    button: {
                      label: (
                        <div className="py-2 px-5 text-sm font-bold text-red-500 bg-gray-200 rounded-full">
                          削除する
                        </div>
                      ),
                      onClick: () => {
                        alert(123);
                      },
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsAccount;
