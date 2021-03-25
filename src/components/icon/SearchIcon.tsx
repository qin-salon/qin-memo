import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const SearchIcon: VFC<Props> = (props) => {
  return (
    <svg
      className={clsx([
        {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

// Propsのデフォルト値
SearchIcon.defaultProps = {
  className: "w-5 h-5",
  disabled: false,
};
