import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

if (process.env.NODE_ENV === "development") {
  require("src/mocks");
}

const App = (props: AppProps) => {
  useEffect(() => {
    const storage = sessionStorage;
    if (!storage.getItem("currentPath")) storage.setItem("currentPath", props.router.asPath);
    return () => {
      const prevPath = storage.getItem("currentPath");
      if (prevPath) storage.setItem("prevPath", prevPath);
      storage.setItem("currentPath", globalThis.location.pathname);
    };
  }, [props.router.asPath]);

  return (
    <ThemeProvider attribute="class">
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};

export default App;
