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

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="relative my-4 flex items-center">
        <Link href="/">
          <a className="absolute left-1">
            <XIcon className="w-5 h-5" />
          </a>
        </Link>
        <span className="block text-center w-full text-xl font-bold">マイページ</span>
      </p>

      <ul className="space-y-10">
        {MENUS.map((menu) => {
          return (
            <li key={menu.category}>
              <p className="py-2 text-gray-400 font-bold">{menu.category}</p>
              <ul className="space-y-6">
                {menu.details.map((detail) => {
                  return (
                    <li key={detail.link}>
                      <Link href={detail.link}>
                        <a className="flex justify-between items-center">
                          <div className="font-bold text-lg">{detail.name}</div>
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
          <p className="py-2 text-gray-400 font-bold">アクション</p>
          <ul className="space-y-6">
            <li>
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">ダークモード</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <label
                    htmlFor="darkmode"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      id="darkmode"
                      className="outline-none right-4 checked:right-0 duration-200 ease-in checked:bg-blue-600 absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="font-bold text-lg text-red-500">ログアウト</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
