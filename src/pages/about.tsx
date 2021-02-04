import Head from "next/head";
import { Layout } from "src/components/layout";
import { ClsxSample } from "src/components/sample/clsxSample";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-gray-800 dark:text-white">About</h2>
      <ClsxSample>clsxサンプル</ClsxSample>
      <ClsxSample bold>clsxサンプル(propsに応じてスタイル変更)</ClsxSample>
    </Layout>
  );
};

export default About;
