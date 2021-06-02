import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactElement, ReactNode, VFC } from "react";
import { cloneElement, forwardRef } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "outline" | "solid-blue" | "solid-red" | "solid-gray" | "solid-white" | "solid-black";
};

type Button = Common & { onClick?: DOMAttributes<HTMLButtonElement>["onClick"] };

type Link = Common & { linkProps: LinkProps };

const isLink = (props: Button | Link): props is Link => {
  return "linkProps" in props;
};

export const Button = forwardRef<HTMLButtonElement, Button | Link>((props, ref) => {
  if (isLink(props)) {
    const { children, linkProps, ...others } = props;
    return (
      <Link {...linkProps} passHref>
        <StyledChildren {...others}>
          <a>{children}</a>
        </StyledChildren>
      </Link>
    );
  }

  // eslint-disable-next-line react/destructuring-assignment
  const { children, ...others } = props;
  return (
    <StyledChildren {...others}>
      <button type="button" ref={ref} onClick={props.onClick}>
        {children}
      </button>
    </StyledChildren>
  );
});

Button.displayName === "Button";

type StyledChildrenProps = Omit<Common, "children"> & { children: ReactElement };

const StyledChildren: VFC<StyledChildrenProps> = (props) => {
  const { children, className, ...others } = props;

  return cloneElement(children, {
    ...others,
    className: clsx(
      "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
      {
        "border dark:border-gray-500 focus:ring-2 focus:ring-blue-400": props.variant === "outline",
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
      className
    ),
  });
};
