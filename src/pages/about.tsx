import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Layout } from "src/components/layout";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    return setMounted(true);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };
  if (!mounted) return null;

  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>About</h2>
      <p>the current theme is: {theme}</p>
      <select
        onBlur={(selectedOptinon) => {
          return handleThemeChange(selectedOptinon.target.value);
        }}
        onChange={(selectedOptinon) => {
          return handleThemeChange(selectedOptinon.target.value);
        }}
      >
        <option selected={theme === "dark"} value="dark">
          Dark
        </option>
        <option selected={theme === "light"} value="light">
          Light
        </option>
      </select>
    </Layout>
  );
};

export default About;
