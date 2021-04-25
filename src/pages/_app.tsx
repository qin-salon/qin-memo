import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

if (process.env.NODE_ENV === "development") {
  require("src/mocks");
}

const App = (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};

export default App;
