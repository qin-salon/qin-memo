import { Popover, Transition } from "@headlessui/react";
import { ChevronLeftIcon, CogIcon, DotsCircleHorizontalIcon, LogoutIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import type { DOMAttributes, VFC } from "react";
import { Fragment } from "react";
import { QinAccountIcon } from "src/components/icon/QinAccountIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Avatar } from "src/components/shared/Avatar";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

type AllOrNone<T> = T | { [Key in keyof T]?: never };
type Note = { page: "note"; isPublic: boolean; onMenuClick: DOMAttributes<HTMLButtonElement>["onClick"] };
type Setting = { page: "setting"; center?: string; left?: "back" | "close" };
type HeaderProps = AllOrNone<Note> | AllOrNone<Setting>;

const isNotePage = (props: HeaderProps): props is Note => {
  return props.page === "note";
};
const isSettingPage = (props: HeaderProps): props is Setting => {
  return props.page === "setting";
};

export const Header: VFC<HeaderProps> = (props) => {
  return (
    <header>
      <div className="flex items-center p-4 pb-8 mx-auto max-w-screen-lg">
        {isSettingPage(props) && props.left ? (
          <Link href="/">
            <a className="grid place-items-center w-9 h-9">
              {props.left === "back" ? <ChevronLeftIcon className="w-5 h-5" /> : <XIcon className="w-5 h-5" />}
            </a>
          </Link>
        ) : null}

        {!isSettingPage(props) ? (
          <Link href="/">
            <a className={clsx({ "w-9 h-9 grid place-items-center": isNotePage(props) })}>
              <QinMemoIcon className={isNotePage(props) ? "w-32 hidden sm:block" : "w-28 sm:w-32"} />
              {isNotePage(props) ? <ChevronLeftIcon className="w-5 h-5 sm:hidden" /> : null}
            </a>
          </Link>
        ) : null}

        {isSettingPage(props) ? (
          <>
            <div className="flex flex-1 justify-center">
              {props.center ? (
                <div className="text-xl font-bold">{props.center}</div>
              ) : (
                <QinAccountIcon className="h-5 sm:h-6" />
              )}
            </div>
            {props.left ? <div className="w-9" /> : null}
          </>
        ) : (
          <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
            {isNotePage(props) ? (
              <>
                {props.isPublic ? (
                  <span className="text-xs font-bold py-1 px-2.5 text-white bg-orange-400 rounded-full">公開中</span>
                ) : null}
                <button className="grid place-items-center w-9 h-9" onClick={props.onMenuClick}>
                  <DotsCircleHorizontalIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link href="/notes/new">
                <a className="grid place-items-center px-4 h-9 text-sm font-bold text-white bg-blue-500 rounded-full">
                  メモを書く
                </a>
              </Link>
            )}
            <UserMenu />
          </div>
        )}
      </div>
    </header>
  );
};

const UserMenu = () => {
  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button>
              <Avatar alt={user.name} src={user.avatarUrl} className="w-9 h-9" />
            </Popover.Button>

            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute left-full z-10 pl-8 sm:pl-0 mt-2 w-screen max-w-xs transform -translate-x-full sm:px-0 sm:max-w-sm xl:-translate-x-1/2 xl:-left-full 2xl:left-1/2"
                >
                  <div className="overflow-hidden p-4 space-y-2 bg-white rounded-2xl ring-1 ring-gray-400 ring-opacity-5 shadow-lg">
                    <div>
                      <Link href="/settings/qin">
                        <a className="flex items-center py-2 px-2 rounded-2xl transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <Avatar alt={user.name} src={user.avatarUrl} className="w-14 h-14" />
                          <div className="ml-4">
                            <p className="text-base font-bold text-gray-900">しまぶー</p>
                            <p className="text-sm text-gray-400">@shimabu</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="grid relative gap-1 bg-white">
                      <Link href="/settings/memo">
                        <a className="flex items-center p-2 rounded-2xl transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex flex-shrink-0 justify-center items-center">
                            <CogIcon className="w-7 h-7" />
                          </div>
                          <p className="ml-4 font-bold">設定</p>
                        </a>
                      </Link>
                      <button className="flex items-center p-2 rounded-2xl transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <div className="flex flex-shrink-0 justify-center items-center">
                          <LogoutIcon className="ml-0.5 w-7 h-7 text-red-500" />
                        </div>
                        <p className="ml-4 font-bold text-red-500">ログアウト</p>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
