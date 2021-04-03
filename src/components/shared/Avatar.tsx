import clsx from "clsx";
import type { MouseEvent, VFC } from "react";

type CommonType = {
  alt: string;
  className?: string;
  size?: "small" | "medium" | "large" | "extralarge";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

type ImgType = CommonType & {
  src: string | null;
};

type ButtonType = CommonType;

// props の型がimage型かbutton型かを判断する関数を定義する。
// 画像ファイルがある場合にimgタブで表示する
const isImg = (props: ImgType | ButtonType): props is ImgType => {
  return "src" in props && !!props.src;
};

export const Avatar: VFC<ImgType | ButtonType> = (props) => {
  // サイズ small:36px medium:48px large:72px extralarge:100px
  const circleClasses = clsx([
    "relative m-2",
    {
      "w-9 h-9": props.size === "small",
      "w-12 h-12": props.size === "medium",
      "w-16 h-16 ": props.size === "large",
      "w-24 h-24 ": props.size === "extralarge",
    },
    props.className,
  ]);

  const fontClasses = clsx([
    "rounded-full w-full h-full flex items-center justify-center bg-blue-300",
    {
      "text-2xl": props.size === "small",
      "text-3xl": props.size === "medium",
      "text-4xl ": props.size === "large",
      "text-5xl ": props.size === "extralarge",
    },
  ]);

  return (
    <div className={circleClasses}>
      {isImg(props) && props.src ? (
        <img src={props.src} alt={props.alt} className="rounded-full w-full h-full" />
      ) : (
        <div className={fontClasses}>
          <span className="m-auto">{props.alt.substr(0, 1)}</span>
        </div>
      )}
    </div>
  );
};

// Propsのデフォルト値
Avatar.defaultProps = {
  size: "small",
};
