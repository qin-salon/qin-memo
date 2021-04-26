import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layout";

const PAGES = [
  { href: "/signin", file: "/signin.tsx", label: "ログインページ", isDone: true },
  { href: "/signup", file: "/signup.tsx", label: "新規登録ページ", isDone: true },
  { href: "/registration", file: "/registration.tsx", label: "初回プロフィール登録ページ", isDone: true },
  { href: "/users/foo", file: "/users/[userId].tsx", label: "ユーザーページ", isDone: true },
  { href: "/search", file: "/search.tsx", label: "メモ検索ページ", isDone: true },
  { href: "/notes/foo", file: "/notes/[noteId].tsx", label: "メモページ", isDone: false },
  { href: "/settings", file: "/settings.tsx", label: "設定一覧ページ", isDone: true },
  { href: "/settings/profile", file: "/settings/profile.tsx", label: "プロフィール変更ページ", isDone: true },
  { href: "/settings/account", file: "/settings/account.tsx", label: "SNS連携ページ", isDone: true },
  // { href: "/settings/notification", file: "/settings/notification.tsx", label: "通知設定ページ", isDone: false },
  // { href: "/terms", file: "/terms", label: "利用規約ページ", isDone: false },
  // { href: "/privacy", file: "/privacy", label: "プライバシーポリシーページ", isDone: false },
] as const;

const Index: NextPage = () => {
  return (
    <Layout>
      <div className="p-4">
        <h2>ページ一覧</h2>
        <ul className="grid grid-flow-row gap-4 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PAGES.map((page) => {
            return (
              <li key={page.href}>
                <Link href={page.href}>
                  <a className="block p-3 border border-black">
                    <div>{`${page.isDone ? "✅ " : ""}${page.label}`}</div>
                    <div>pages{page.file} のページです</div>
                  </a>
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
