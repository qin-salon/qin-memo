import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  className?: string;
  size?: "large" | "small";
};

export const AppleIcon: VFC<Props> = (props) => {
  const classes = clsx([
    {
      "w-6 h-6": props.size === "large",
      "w-5 h-5": props.size === "small",
    },
    props.className,
  ]);
  return (
    <svg className={classes} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.9762 17.1452C18.6434 17.9138 18.2496 18.6213 17.7934 19.2718C17.1714 20.1585 16.6621 20.7723 16.2697 21.1132C15.6613 21.6727 15.0095 21.9592 14.3115 21.9755C13.8104 21.9755 13.2061 21.8329 12.5026 21.5437C11.7969 21.2558 11.1483 21.1132 10.5553 21.1132C9.93334 21.1132 9.2663 21.2558 8.55282 21.5437C7.83825 21.8329 7.2626 21.9837 6.82247 21.9986C6.15312 22.0271 5.48595 21.7324 4.81999 21.1132C4.39494 20.7425 3.86329 20.1069 3.2264 19.2066C2.54306 18.2451 1.98126 17.1302 1.54114 15.8592C1.06979 14.4862 0.833496 13.1568 0.833496 11.8697C0.833496 10.3953 1.15208 9.1237 1.7902 8.05809C2.2917 7.20215 2.95888 6.52696 3.7939 6.0313C4.62892 5.53563 5.53117 5.28305 6.50281 5.26689C7.03446 5.26689 7.73164 5.43134 8.59804 5.75454C9.46199 6.07883 10.0167 6.24328 10.2599 6.24328C10.4418 6.24328 11.058 6.05099 12.1027 5.66763C13.0907 5.31211 13.9245 5.1649 14.6075 5.22289C16.4585 5.37227 17.849 6.10191 18.7738 7.41644C17.1184 8.41945 16.2996 9.82428 16.3159 11.6265C16.3308 13.0302 16.84 14.1983 17.8409 15.1258C18.2944 15.5563 18.801 15.889 19.3645 16.1253C19.2423 16.4798 19.1133 16.8193 18.9762 17.1452ZM14.7311 0.440614C14.7311 1.54086 14.3291 2.56817 13.5279 3.51903C12.561 4.64941 11.3915 5.3026 10.1233 5.19953C10.1072 5.06753 10.0978 4.92861 10.0978 4.78263C10.0978 3.72639 10.5576 2.596 11.3742 1.67176C11.7818 1.2038 12.3003 0.814697 12.9291 0.504302C13.5564 0.198539 14.1499 0.0294449 14.708 0.000488281C14.7243 0.147575 14.7311 0.29467 14.7311 0.440599V0.440614Z"
        fill="white"
      />
    </svg>
  );
};

// Propsのデフォルト値
AppleIcon.defaultProps = {
  className: "",
  size: "small",
};
