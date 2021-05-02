import { ChevronRightIcon, XIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";

type Menu = {
  category: string;
  details: {
    link: string;
    name: string;
  }[];
};

const MENUS: Menu[] = [
  {
    category: "設定",
    details: [
      {
        link: "/settings/profile",
        name: "プロフィール設定",
      },
      {
        link: "/settings/account",
        name: "アカウント設定",
      },
      {
        link: "/settings/notification",
        name: "通知設定",
      },
    ],
  },
  {
    category: "サポート",
    details: [
      {
        link: "/privacy",
        name: "プライバシーポリシー",
      },
      {
        link: "/terms",
        name: "利用規約",
      },
      {
        link: "/license",
        name: "ライセンス",
      },
    ],
  },
];

const SettingsMemo: NextPage = () => {
  return (
    <div className="p-4 mx-auto max-w-screen-sm">
      <p className="flex relative items-center my-4">
        <Link href="/">
          <a className="absolute left-1">
            <XIcon className="w-5 h-5" />
          </a>
        </Link>
        <span className="block w-full text-xl font-bold text-center">マイページ</span>
      </p>

      <ul className="space-y-10">
        {MENUS.map((menu) => {
          return (
            <li key={menu.category}>
              <p className="py-2 font-bold text-gray-400">{menu.category}</p>
              <ul className="space-y-6">
                {menu.details.map((detail) => {
                  return (
                    <li key={detail.link}>
                      <Link href={detail.link}>
                        <a className="flex justify-between items-center">
                          <div className="text-lg font-bold">{detail.name}</div>
                          <ChevronRightIcon className="w-5 h-5" />
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}

        <li>
          <p className="py-2 font-bold text-gray-400">アクション</p>
          <ul className="space-y-6">
            <li>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">ダークモード</div>
                <div className="inline-block relative mr-2 w-10 align-middle transition duration-200 ease-in select-none">
                  <label
                    htmlFor="darkmode"
                    className="block overflow-hidden h-6 bg-gray-300 rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      id="darkmode"
                      className="block absolute right-4 w-6 h-6 bg-white rounded-full border-2 duration-200 ease-in appearance-none cursor-pointer outline-none checked:right-0 checked:bg-blue-600"
                    />
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="text-lg font-bold text-red-500">ログアウト</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SettingsMemo;
