import type { VFC } from "react";

type Props = {
  className?: string;
  disabled?: boolean;
};

export const SigninOut: VFC<Props> = (props) => {
  return (
    <svg className={props.className} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9167 12.6667V13.5834C10.9167 14.3128 10.6269 15.0122 10.1112 15.528C9.59549 16.0437 8.89601 16.3334 8.16667 16.3334H4.5C3.77065 16.3334 3.07118 16.0437 2.55546 15.528C2.03973 15.0122 1.75 14.3128 1.75 13.5834V4.41675C1.75 3.6874 2.03973 2.98793 2.55546 2.4722C3.07118 1.95648 3.77065 1.66675 4.5 1.66675H8.16667C8.89601 1.66675 9.59549 1.95648 10.1112 2.4722C10.6269 2.98793 10.9167 3.6874 10.9167 4.41675V5.33341M14.5833 12.6667L18.25 9.00008L14.5833 12.6667ZM18.25 9.00008L14.5833 5.33341L18.25 9.00008ZM18.25 9.00008H5.41667H18.25Z"
        stroke={props.disabled ? "#9CA3AF" : "#EF4444"}
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
// Propsのデフォルト値
SigninOut.defaultProps = {
  className: "w-5 h-5",
  disabled: false,
};
