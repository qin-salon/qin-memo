import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactNode } from "react";
import { forwardRef, useMemo } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "outline" | "ghost" | "solid-blue" | "solid-red" | "solid-gray" | "solid-white" | "solid-black";
};

type Button = Common & { onClick?: DOMAttributes<HTMLButtonElement>["onClick"] };

type Link = Common & { linkProps: LinkProps };

const isLink = (props: Button | Link): props is Link => {
  return "linkProps" in props;
};

export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, Button | Link>((props, ref) => {
  const className = useMemo(() => {
    return clsx(
      "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
      {
        "border dark:border-gray-500 focus:ring-2 focus:ring-blue-400": props.variant === "outline",
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 focus-visible:ring-blue-400":
          props.variant === "ghost",
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400":
          props.variant === "solid-blue",
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400":
          props.variant === "solid-red",
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600 focus-visible:ring-blue-400":
          props.variant === "solid-gray",
        "dark:text-black bg-white hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-200 dark:focus:bg-gray-200":
          props.variant === "solid-white",
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-900":
          props.variant === "solid-black",
      },
      props.className
    );
  }, [props.className, props.variant]);

  if (isLink(props)) {
    return (
      <Link {...props.linkProps}>
        <a ref={ref} className={className}>
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <button type="button" ref={ref} onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
});

Button.displayName === "Button";
