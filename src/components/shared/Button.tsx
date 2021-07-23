import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";
import { forwardRef, useMemo } from "react";

type Props = (ButtonHTMLAttributes<HTMLButtonElement> | LinkProps) & {
  children: ReactNode;
  className?: string;
  variant?: "outline" | "ghost" | "solid-blue" | "solid-red" | "solid-gray" | "solid-white" | "solid-black";
};

const isLink = (props: ButtonHTMLAttributes<HTMLButtonElement> | LinkProps): props is LinkProps => {
  return "href" in props;
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>((props, ref) => {
  const { children, className, variant, ...rest } = props;

  const classes = useMemo(() => {
    return clsx(
      "grid place-items-center font-bold rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none",
      {
        "border dark:border-gray-500 focus:ring-2 focus:ring-blue-400": variant === "outline",
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 focus-visible:ring-blue-400":
          variant === "ghost",
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400":
          variant === "solid-blue",
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400":
          variant === "solid-red",
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600 focus-visible:ring-blue-400":
          variant === "solid-gray",
        "dark:text-black bg-white hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-200 dark:focus:bg-gray-200":
          variant === "solid-white",
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-900":
          variant === "solid-black",
      },
      className
    );
  }, [className, variant]);

  if (isLink(rest)) {
    return (
      <Link {...rest}>
        <a ref={ref as ForwardedRef<HTMLAnchorElement>} className={classes}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button type="button" ref={ref as ForwardedRef<HTMLButtonElement>} {...rest} className={classes}>
      {children}
    </button>
  );
});

Button.displayName === "Button";
