import type { VFC } from "react";

type Props = {
  className?: string;
};

export const CheckCircle: VFC<Props> = (props) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

// Propsのデフォルト値
CheckCircle.defaultProps = {
  className: "w-5 h-5",
};
