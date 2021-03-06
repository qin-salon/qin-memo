import { Popover, Transition } from "@headlessui/react";
import { ChevronLeftIcon, CogIcon, LogoutIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { Fragment, memo, useCallback } from "react";
import { QinAccountIcon } from "src/components/icons/QinAccountIcon";
import { QinMemoIcon } from "src/components/icons/QinMemoIcon";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { useUser } from "src/domains/auth";

type Right = "profile" | JSX.Element;

const ICON_SIZE = "w-10 h-10";

export type HeaderProps = {
  left?: "back" | "close" | "memo" | JSX.Element;
  center?: "account" | string | JSX.Element;
  right?: ("profile" | JSX.Element)[];
};

export const Header = memo<HeaderProps>((props) => {
  return (
    <header className="flex items-center">
      <Left left={props.left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={props.center} />
      </div>

      <Right right={props.right} />
    </header>
  );
});
Header.displayName = "Header";

const Left = memo<Pick<HeaderProps, "left">>((props) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem("prevPath");
    return prevPath ? router.back() : router.push("/");
  }, [router]);

  if (!props.left) {
    return <div className={ICON_SIZE} />;
  }
  if (props.left === "back" || props.left === "close") {
    return (
      <Button variant="ghost" className={ICON_SIZE} onClick={handleClick}>
        {props.left === "back" ? <ChevronLeftIcon className="w-5 h-5" /> : null}
        {props.left === "close" ? <XIcon className="w-5 h-5" /> : null}
      </Button>
    );
  }
  if (props.left === "memo") {
    return (
      <Link href="/">
        <a>
          <QinMemoIcon className="w-28 sm:w-32" />
        </a>
      </Link>
    );
  }
  return props.left;
});
Left.displayName = "Left";

const Center = memo<Pick<HeaderProps, "center">>((props) => {
  if (!props.center) {
    return null;
  }
  if (props.center === "account") {
    return (
      <Link href="/settings/qin">
        <a>
          <QinAccountIcon className="h-5 sm:h-6" />
        </a>
      </Link>
    );
  }
  if (typeof props.center === "string") {
    return <div className="text-xl font-bold">{props.center}</div>;
  }
  return props.center;
});
Center.displayName = "Center";

const Right = memo<Pick<HeaderProps, "right">>((props) => {
  if (!props.right) {
    return <div className={ICON_SIZE} />;
  }
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {props.right.map((item, i) => {
        return <Fragment key={i}>{item === "profile" ? <UserMenu /> : item}</Fragment>;
      })}
    </div>
  );
});
Right.displayName = "Right";

const UserMenu: VFC = () => {
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
                alt={user?.name}
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
                  className="absolute left-full xl:-left-full 2xl:left-1/2 z-10 sm:px-0 pl-8 sm:pl-0 mt-2 w-screen max-w-xs sm:max-w-sm transform -translate-x-full xl:-translate-x-1/2"
                >
                  <div className="overflow-hidden py-4 bg-white dark:bg-gray-800 rounded-2xl ring-1 ring-gray-400 ring-opacity-20 shadow-lg">
                    <div>
                      <Link href="/settings/qin">
                        <a className="flex items-center p-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none">
                          <Avatar
                            alt={user?.name}
                            src={user?.avatarUrl}
                            width={56}
                            height={56}
                            className={clsx(ICON_SIZE, "overflow-hidden rounded-full")}
                            noDialog
                          />
                          <div className="ml-4">
                            <p className="text-base font-bold">{user?.name}</p>
                            <p className="text-sm text-gray-400">@{user?.accountId}</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="grid relative">
                      <Link href="/settings/memo">
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
