import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layout";

const PAGES = [
  { href: "/signin", label: "ログイン" },
  { href: "/signup", label: "新規登録" },
  { href: "/registration", label: "初回プロフィール登録" },
  { href: "/user/foo", label: "ユーザーページ" },
  { href: "/search", label: "メモ検索ページ" },
  { href: "/note/foo", label: "メモページ" },
  { href: "/settings", label: "各種設定への画面" },
  { href: "/settings/profile", label: "プロフィール変更ページ" },
  { href: "/settings/account", label: "SNS連携ページ" },
  { href: "/settings/notification", label: "通知設定ページ" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
] as const;

const Index: NextPage = () => {
  return (
    <Layout>
      <div className="p-4">
        <h2>ページ一覧</h2>
        <ul className="mt-2 grid gap-4 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PAGES.map((page) => {
            return (
              <li key={page.href}>
                <Link href={page.href}>
                  <a className="block p-3 border border-black">{page.label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;
