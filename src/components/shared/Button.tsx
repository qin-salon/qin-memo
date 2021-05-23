import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type Button = Common & { onClick?: DOMAttributes<HTMLButtonElement>["onClick"] };

type Link = Common & { linkProps: LinkProps };

const isLink = (props: Button | Link): props is Link => {
  return "href" in props;
};

export const Button: VFC<Button | Link> = (props) => {
  return isLink(props) ? (
    <Link {...props.linkProps}>
      <a
        className={clsx(
          "w-full flex items-center justify-center font-bold rounded-full hover:bg-opacity-80",
          props.className
        )}
      >
        {props.children}
      </a>
    </Link>
  ) : (
    <button
      type="button"
      className={clsx(
        "w-full flex items-center justify-center font-bold rounded-full hover:bg-opacity-80",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
