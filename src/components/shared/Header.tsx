import { Popover, Transition } from "@headlessui/react";
import { ChevronLeftIcon, CogIcon, LogoutIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, memo, useCallback } from "react";
import { QinAccountIcon } from "src/components/icon/QinAccountIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Avatar } from "src/components/shared/Avatar";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

type Right = "profile" | JSX.Element;

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
    return <div className="w-9 h-9" />;
  }
  if (props.left === "back") {
    return (
      <button type="button" onClick={handleClick} className="grid place-items-center w-9 h-9">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
    );
  }
  if (props.left === "close") {
    return (
      <button type="button" onClick={handleClick} className="grid place-items-center w-9 h-9">
        <XIcon className="w-5 h-5" />
      </button>
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
    return <div className="w-9 h-9" />;
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

const UserMenu = memo(() => {
  const router = useRouter();
  const handleSignOut = useCallback(async () => {
    await router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <div className="overflow-hidden py-4 bg-white rounded-2xl ring-1 ring-gray-400 ring-opacity-20 shadow-lg">
                    <div>
                      <Link href="/settings/qin">
                        <a className="flex items-center p-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <Avatar alt={user.name} src={user.avatarUrl} className="w-14 h-14" />
                          <div className="ml-4">
                            <p className="text-base font-bold text-gray-900">しまぶー</p>
                            <p className="text-sm text-gray-400">@shimabu</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="grid relative bg-white">
                      <Link href="/settings/memo">
                        <a className="flex items-center py-2.5 px-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex flex-shrink-0 justify-center items-center">
                            <CogIcon className="w-7 h-7" />
                          </div>
                          <p className="ml-4 font-bold">設定</p>
                        </a>
                      </Link>
                      <button
                        type="button"
                        className="flex items-center py-2.5 px-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
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
});
UserMenu.displayName = "UserMenu";
