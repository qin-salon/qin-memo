import { ChevronLeftIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import type { DOMAttributes, VFC } from "react";
import { useMemo } from "react";
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
          <Link href="/users/foo">
            <a className={clsx({ "hidden sm:block": isNotePage })}>
              <Avatar alt={user.name} src={user.avatarUrl} className="w-9 h-9" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
