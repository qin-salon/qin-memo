import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { memo } from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "src/context/user";
import { initAuth } from "src/context/user/initAuth";

import { useAddClassToBodyElem } from "./useAddClassToBodyElem";
import { useSessionRouter } from "./useSessionRouter";

// if (process.env.NODE_ENV === "development") {
//   require("src/api/mock");
// }

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

export default memo(App);
