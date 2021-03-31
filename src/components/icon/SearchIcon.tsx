import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
  size?: "large" | "middle" | "small";
};

export const SearchIcon: VFC<Props> = (props) => {
  const classes = clsx("w-5 h-5 my-auto", {
    "mr-2 ml-2": props.size === "large",
    "mr-1 ml-1": props.size !== "large",
  }, props.className);
  return (
    <svg
      className={clsx(classes)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
};

// Propsのデフォルト値
SearchIcon.defaultProps = {
  disabled: false,
};
