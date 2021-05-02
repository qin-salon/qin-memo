import { Popover, Transition } from "@headlessui/react";
import { ChevronLeftIcon, DotsCircleHorizontalIcon, LogoutIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import type { DOMAttributes, VFC } from "react";
import { Fragment, useMemo } from "react";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Avatar } from "src/components/shared/Avatar";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

type AllOrNone<T> = T | { [Key in keyof T]?: never };

type Note = { page: "note"; isPublic: boolean; onMenuClick: DOMAttributes<HTMLButtonElement>["onClick"] };

type HeaderProps = AllOrNone<Note>;

export const Header: VFC<HeaderProps> = (props) => {
  const isNotePage = useMemo(() => {
    return props.page === "note";
  }, [props.page]);

  return (
    <header>
      <div className="flex items-center p-4 pb-0 mx-auto max-w-screen-lg">
        <Link href="/">
          <a className={clsx({ "w-9 h-9 grid place-items-center": isNotePage })}>
            <QinMemoIcon className={isNotePage ? "w-32 hidden sm:block" : "w-28 sm:w-32"} />
            {isNotePage ? <ChevronLeftIcon className="w-5 h-5 sm:hidden" /> : null}
          </a>
        </Link>

        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
          {isNotePage ? (
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
                            <Link href="/users/foo">
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
                            <button className="flex items-center p-2 rounded-2xl transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                              <div className="flex flex-shrink-0 justify-center items-center">
                                <LogoutIcon className="w-7 h-7 text-red-500" />
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
        </div>
      </div>
    </header>
  );
};
