import "src/styles/global.css";

import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("libs/mocks");
}

const App = (props: AppProps) => {
  return <props.Component {...props.pageProps} />;
};

export default App;
