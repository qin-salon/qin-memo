import Head from "next/head";
import { Layout } from "src/components/layout";
import { ClsxSample } from "src/components/sample/clsxSample";
import { ThermeChangerSample } from "src/components/sample/themeChangerSample";

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>About</h2>
      <ClsxSample>clsxサンプル</ClsxSample>
      <ClsxSample bold>clsxサンプル(propsに応じてスタイル変更)</ClsxSample>
      <ThermeChangerSample />
    </Layout>
  );
};

export default About;
