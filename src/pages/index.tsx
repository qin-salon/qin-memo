import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layout";

const PAGES = [
  { href: "/signin", label: "ログインページ", isDone: true },
  { href: "/signup", label: "新規登録ページ", isDone: false },
  { href: "/registration", label: "初回プロフィール登録ページ", isDone: false },
  { href: "/users/foo", label: "ユーザーページ", isDone: false },
  { href: "/search", label: "メモ検索ページ", isDone: false },
  { href: "/notes/foo", label: "メモページ", isDone: false },
  { href: "/settings", label: "設定一覧ページ", isDone: false },
  { href: "/settings/profile", label: "プロフィール変更ページ", isDone: false },
  { href: "/settings/account", label: "SNS連携ページ", isDone: false },
  { href: "/settings/notification", label: "通知設定ページ", isDone: false },
  { href: "/terms", label: "利用規約ページ", isDone: false },
  { href: "/privacy", label: "プライバシーポリシーページ", isDone: false },
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
                  <a className="block p-3 border border-black">{`${page.isDone ? "✅ " : ""}${page.label}`}</a>
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
