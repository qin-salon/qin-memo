import clsx from "clsx";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";

type CommonType = {
  id: string;
  color?: "blue" | "red" | "black" | "white" | "gray" | "orange";
  textColor?: "black" | "red" | "blue";
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  StartIcon?: VFC;
  EndIcon?: VFC;
  size?: "large" | "small";
};
type ButtonType = CommonType & {
  type: "button";
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  onKeyDown: DOMAttributes<HTMLButtonElement>["onKeyDown"];
};

type LinkType = CommonType & {
  type: "link";
  linkProps: string;
};

export const Button: VFC<ButtonType | LinkType> = (props) => {
  // props の型がbutton型かlink型かを判断する関数を定義する。
  // props にonClickを持っている場合は true
  const isButton = (props: ButtonType | LinkType): props is ButtonType => {
    return "onClick" in props;
  };

  // ボタンのCSS
  const classes = clsx([
    " my-4 mx-auto rounded-full focus:outline-none flex flex-row justify-center",
    {
      "text-white bg-blue-500 hover:bg-blue-600": props.color === "blue" && props.disabled === false,
      "text-white bg-red-500 hover:bg-red-600": props.color === "red" && props.disabled === false,
      "text-white bg-yellow-500 hover:bg-yellow-600": props.color === "orange" && props.disabled === false,
      "text-black bg-gray-300 hover:bg-gray-400": props.color === "gray" && props.disabled === false,
      "text-white bg-black hover:bg-gray-500": props.color === "black" && props.disabled === false,
      "bg-white hover:bg-gray-300": props.color === "white" && props.disabled === false,
      "text-black": props.color === "white" && props.disabled === false && props.textColor === "black",
      "text-red-500": props.color === "white" && props.disabled === false && props.textColor === "red",
      "text-blue-500": props.color === "white" && props.disabled === false && props.textColor === "blue",
      "text-gray-400 bg-gray-300": props.disabled,
      "py-4 px-8": props.size === "large",
      "py-2 px-4": props.size === "small",
    },
    props.className,
  ]);
  const iconClasses = clsx([
    "my-auto",
    {
      "mx-3": props.size === "large",
      "mx-2": props.size === "small",
    },
  ]);
  // tabindex に正の値を指定するとESLintでtabindex-no-positiveのエラーが
  // 発生するため、0 固定としておく（-1だとタブ入力で移動しない）
  return (
    <div className="mx-auto">
      {isButton(props) ? (
        <span
          data-testid={props.id}
          role="button"
          className={classes}
          tabIndex={0}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
        >
          {props.StartIcon && (
            <div className={iconClasses}>
              <props.StartIcon />
            </div>
          )}
          <strong>{props.children}</strong>
          {props.EndIcon && (
            <div className={iconClasses}>
              <props.EndIcon />
            </div>
          )}
        </span>
      ) : (
        <Link href={props.linkProps}>
          <span data-testid={props.id} role="link" className={classes}>
            {props.StartIcon && (
              <div className={iconClasses}>
                <props.StartIcon />
              </div>
            )}
            <strong>{props.children}</strong>
            {props.EndIcon && (
              <div className={iconClasses}>
                <props.EndIcon />
              </div>
            )}
          </span>
        </Link>
      )}
    </div>
  );
};
// Propsのデフォルト値
Button.defaultProps = {
  color: "blue",
  textColor: "black",
  disabled: false,
  className: "",
  type: "button",
  size: "small",
};
