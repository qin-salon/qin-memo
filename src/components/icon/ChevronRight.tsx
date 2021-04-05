import type { VFC } from "react";

type Props = {
  className?: string;
};

export const ChevronRight: VFC<Props> = (props) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
};

// Propsのデフォルト値
ChevronRight.defaultProps = {
  className: "w-5 h-5",
};
