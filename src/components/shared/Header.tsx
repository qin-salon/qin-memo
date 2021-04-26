import Link from "next/link";
import type { VFC } from "react";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

export const Header: VFC = () => {
  return (
    <header>
      <div className="flex items-center px-4 mx-auto max-w-5xl">
        <Link href="/">
          <a>
            <QinMemoIcon className="w-28 sm:w-32" />
          </a>
        </Link>
        <div className="flex items-center ml-auto space-x-2">
          <Button linkProps={{ href: "/notes/new" }}>メモを書く</Button>
          <Link href="/users/foo">
            <a>
              <Avatar alt={user.name} src={user.avatarUrl} className="w-10 h-10" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
