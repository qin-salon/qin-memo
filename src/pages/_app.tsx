import "src/styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("libs/mocks");
}

const App = (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};

export default App;
