import type { NextPage } from "next";
import Link from "next/link";
import { XIcon } from "src/components/icon/XIcon";
import { ChevronRight } from "src/components/icon/ChevronRight";

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="relative my-4 flex items-center">
        <Link href="/">
          <a className="absolute left-1">
            <XIcon />
          </a>
        </Link>
        <span className="block text-center w-full text-xl font-bold">マイページ</span>
      </p>

      <p className="py-2 text-gray-400 font-bold">設定</p>
      <Link href="/settings/profile">
        <a className="flex justify-between items-center mb-3">
          <div className="mt-2 font-bold text-lg">プロフィール設定</div>
          <ChevronRight />
        </a>
      </Link>
      <Link href="/settings/account">
        <a className="flex justify-between items-center mb-3">
          <div className="mt-2 font-bold text-lg">アカウント設定</div>
          <ChevronRight />
        </a>
      </Link>
      <Link href="/settings/notification">
        <a className="flex justify-between items-center mb-3">
          <div className="mt-2 font-bold text-lg">通知設定</div>
          <ChevronRight />
        </a>
      </Link>

      <p className="mt-6 py-2 text-gray-400 font-bold">サポート</p>
      <Link href="/privacy">
        <a className="flex justify-between items-center mb-3">
          <div className="amt-3 font-bold text-lg">プライバシーポリシー</div>
          <ChevronRight />
        </a>
      </Link>
      <Link href="/terms">
        <a className="flex justify-between items-center mb-3">
          <div className="mt-3 font-bold text-lg">利用規約</div>
          <ChevronRight />
        </a>
      </Link>
      <Link href="/license">
        <a className="flex justify-between items-center mb-3">
          <div className="mt-3 font-bold text-lg">ライセンス</div>
          <ChevronRight />
        </a>
      </Link>

      <p className="mt-6 py-2 text-gray-400 font-bold">アクション</p>
      <div className="flex justify-between items-center mb-3">
        <div className="mt-3 font-bold text-lg">ダークモード</div>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="darkmode"
            className="outline-none right-4 checked:right-0 duration-200 ease-in checked:bg-blue-600 absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
          />
          <label
            htmlFor="darkmode"
            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
      <div className="mt-3 font-bold text-lg text-red-500">ログアウト</div>
    </div>
  );
};

export default Settings;
