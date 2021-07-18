import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "src/domains/auth";
import { useAddClassToBodyElem } from "src/hooks/useAddClassToBodyElem";
import { useSessionRouter } from "src/hooks/useSessionRouter";
import { initAuth } from "src/utils/initAuth";

if (process.env.NODE_ENV === "development") {
  // require("src/mocks");
}

initAuth();

const App = (props: AppProps) => {
  useSessionRouter(props.router.asPath);
  useAddClassToBodyElem("dark:bg-gray-800");

  return (
    <ThemeProvider attribute="class">
      <UserProvider>
        <props.Component {...props.pageProps} />
      </UserProvider>
      <Toaster toastOptions={{ duration: 2500, className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold" }} />
    </ThemeProvider>
  );
};

export default App;
