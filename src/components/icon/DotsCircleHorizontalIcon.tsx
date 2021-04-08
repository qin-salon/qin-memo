import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const DotsCircleHorizontalIcon: VFC<Props> = (props) => {
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

// Propsのデフォルト値
DotsCircleHorizontalIcon.defaultProps = {
  className: "w-5 h-5",
};
