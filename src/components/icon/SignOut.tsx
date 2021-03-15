import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
  textColor?: "red" | "gray";
};

export const SignOut: VFC<Props> = (props) => {
  return (
    <svg
      className={clsx([
        {
          "text-red-500": !props.disabled,
          "text-gray-500": props.disabled,
        },
        props.className,
      ])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
};
// Propsのデフォルト値
SignOut.defaultProps = {
  className: "w-5 h-5",
  disabled: false,
  textColor: "red",
};
