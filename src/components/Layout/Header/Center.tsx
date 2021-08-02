import Link from "next/link";
import { memo } from "react";
import { QinAccountIcon } from "src/components/Icons";

export type Center = {
  center?: "account" | string | JSX.Element;
};

/**
 * @package
 */
export const Center = memo<Center>((props) => {
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
