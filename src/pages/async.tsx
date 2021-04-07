/* eslint-disable no-console */
import type { NextPage } from "next";
import { Layout } from "src/components/layout";
import type { UserPutRequest, UserType } from "src/types/types";
import useSWR from "swr";

const Async: NextPage = () => {
  const { data, error } = useSWR<UserType>("/users/foo");

  const handleClick = async () => {
    const req: UserPutRequest = { id: "foo", name: "秦子" };
    console.log({ ブラウザから送るリクエスト: req });
    const res = await fetch("/users/foo", {
      method: "put",
      body: JSON.stringify(req),
    });
    const json = await res.json();
    console.log({ サーバーから受け取ったレスポンス: json });
  };

  return (
    <Layout>
      <h2 className="text-gray-800 dark:text-white">非同期の叩き方テスト</h2>
      <button className="text-gray-800 dark:text-white" onClick={handleClick}>
        クリックでfetch（logに出力）
      </button>

      <div className="mt-4 text-gray-800 dark:text-white">
        {error ? <div>failed to load</div> : null}
        {data ? (
          <div>
            <img src={data.avatarUrl} alt={data.name} width={80} height={80} />
            <h2>{data.name}</h2>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Async;
