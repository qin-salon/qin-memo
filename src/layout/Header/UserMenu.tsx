import { Popover, Transition } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { Fragment, useCallback } from "react";
import { Avatar } from "src/component/Avatar";
import { useUser } from "src/context/user";

import { ICON_SIZE } from "./constant";

/**
 * @package
 */
export const UserMenu: VFC = () => {
  const AuthUser = useAuthUser();
  const { user } = useUser();
  const handleSignOut = useCallback(() => {
    return AuthUser.signOut();
  }, [AuthUser]);

  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button className="flex rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none">
              <Avatar
                alt={user?.accountName}
                src={user?.avatarUrl}
                width={40}
                height={40}
                className={clsx(ICON_SIZE, "overflow-hidden rounded-full")}
                noDialog
              />
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
                  className="absolute left-full z-10 pl-8 mt-2 w-screen max-w-xs transform -translate-x-full sm:px-0 sm:pl-0 sm:max-w-sm xl:-left-full xl:-translate-x-1/2 2xl:left-1/2"
                >
                  <div className="overflow-hidden py-4 bg-white dark:bg-gray-800 rounded-2xl ring-1 ring-gray-400 ring-opacity-20 shadow-lg">
                    <div>
                      <Link href="/setting/qin">
                        <a className="flex items-center p-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none">
                          <Avatar
                            alt={user?.accountName}
                            src={user?.avatarUrl}
                            width={56}
                            height={56}
                            className={clsx(ICON_SIZE, "overflow-hidden rounded-full")}
                            noDialog
                          />
                          <div className="ml-4">
                            <p className="text-base font-bold">{user?.accountName}</p>
                            <p className="text-sm text-gray-400">@{user?.userName}</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="grid relative">
                      <Link href="/setting/memo">
                        <a className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none">
                          <div className="flex flex-shrink-0 justify-center items-center">
                            <CogIcon className="w-7 h-7" />
                          </div>
                          <p className="ml-4 font-bold">設定</p>
                        </a>
                      </Link>
                      <button
                        type="button"
                        className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                        onClick={handleSignOut}
                      >
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
