import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const ChevronRight: VFC<Props> = (props) => {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

// Propsのデフォルト値
ChevronRight.defaultProps = {
  className: "w-5 h-5",
  disabled: false,
};
