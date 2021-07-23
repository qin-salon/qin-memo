import { ChevronLeftIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import { Button } from "src/components/shared/Button";
import { QinMemoIcon } from "src/components/shared/Icons";

import { ICON_SIZE } from "./constants";

/**
 * @package
 */
export type Left = {
  left?: "back" | "close" | "memo" | JSX.Element;
};

/**
 * @package
 */
export const Left = memo<Left>((props) => {
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
