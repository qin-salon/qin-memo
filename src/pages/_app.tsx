import "src/styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const App = (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};

export default App;
