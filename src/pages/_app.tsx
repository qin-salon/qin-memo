import "src/styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("libs/mocks");
}

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init).then((res) => {
    return res.json();
  });
};

const App = (props: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider attribute="class">
        <props.Component {...props.pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
