import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { memo } from "react";
import { Toaster } from "react-hot-toast";
import { initAuth } from "src/util/auth";

import { useAddClassToBodyElem } from "./_app/useAddClassToBodyElem";
import { useSessionRouter } from "./_app/useSessionRouter";

// if (process.env.NODE_ENV === "development") {
//   require("src/api/mock");
// }

initAuth();

const App = (props: AppProps) => {
  useSessionRouter(props.router.asPath);
  useAddClassToBodyElem("dark:bg-gray-800 dark:text-white");

  return (
    <ThemeProvider attribute="class">
      <DefaultSeo
        additionalLinkTags={[
          { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
          { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
          { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
          { rel: "manifest", href: "/site.webmanifest" },
        ]}
        titleTemplate="%s - Qin Memo"
        defaultTitle="Qin Memo"
        description="Qin Memoはクラウドにデータを保存できるシンプルなメモ帳です。余計な機能を一切省き、テキストを残すことだけに特化しました。"
        canonical="https://www.memo.qin.sh/"
        openGraph={{
          type: "website",
          locale: props.router.locale,
          site_name: "Qin Memo",
          description:
            "Qin Memoはクラウドにデータを保存できるシンプルなメモ帳です。余計な機能を一切省き、テキストを残すことだけに特化しました。",
          url: "https://www.memo.qin.sh/",
          images: [{ url: "https://www.memo.qin.sh/logo/1200x630.png", width: 1200, height: 630, alt: "Qin Memo" }],
        }}
      />
      <props.Component {...props.pageProps} />
      <Toaster toastOptions={{ className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold" }} />
    </ThemeProvider>
  );
};

export default memo(App);
