import clsx from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { DOMAttributes, ReactNode, VFC } from "react";

type CommonType = {
  id: string;
  bgColor?: "blue" | "red" | "black" | "white" | "gray" | "orange" | "transparent";
  textColor?: "black" | "red" | "blue";
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  // StartIcon?: VFC<any | undefined>;
  startIcon?: JSX.Element;
  EndIcon?: VFC<any | undefined>;
  size?: "large" | "small";
};
type ButtonType = CommonType & {
  // type: "button";
  button: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  onKeyDown?: DOMAttributes<HTMLButtonElement>["onKeyDown"];
};

type LinkType = CommonType & {
  // type: "link";
  linkProps: LinkProps;
};

// props の型がbutton型かlink型かを判断する関数を定義する。
// props にonClickを持っている場合は true
const isButton = (props: ButtonType | LinkType): props is ButtonType => {
  // return props.type === "button";
  return "button" in props;
};

export const Button: VFC<ButtonType | LinkType> = (props) => {
  // ボタンのCSS
  const classes = clsx([
    " my-4 mx-auto rounded-full focus:outline-none flex flex-row justify-center",
    {
      "text-white bg-blue-500 hover:bg-blue-600": props.bgColor === "blue" && props.disabled === false,
      "text-white bg-red-500 hover:bg-red-600": props.bgColor === "red" && props.disabled === false,
      "text-white bg-yellow-500 hover:bg-yellow-600": props.bgColor === "orange" && props.disabled === false,
      "text-black bg-gray-300 hover:bg-gray-400": props.bgColor === "gray" && props.disabled === false,
      "text-white bg-black hover:bg-gray-500": props.bgColor === "black" && props.disabled === false,
      "bg-white hover:bg-gray-300": props.bgColor === "white" && props.disabled === false,
      "bg-transparent": props.bgColor === "transparent" && props.disabled === false,
      "text-black": props.bgColor === "white" && props.disabled === false && props.textColor === "black",
      "text-red-500": props.bgColor === "white" && props.disabled === false && props.textColor === "red",
      "text-blue-500": props.bgColor === "white" && props.disabled === false && props.textColor === "blue",
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

  if (props.disabled) {
    return (
      <button className={classes}>
        {props.startIcon && <div className={iconClasses}>{props.startIcon}</div>}
        <strong>{props.children}</strong>
        {props.EndIcon && (
          <div className={iconClasses}>
            <props.EndIcon disabled={props.disabled} />
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="mx-auto">
      {isButton(props) ? (
        <button className={classes} onClick={props.onClick} onKeyDown={props.onKeyDown}>
          {props.startIcon ? <div className={iconClasses}>{props.startIcon}</div> : null}
          <strong>{props.children}</strong>
          {props.EndIcon ? (
            <div className={iconClasses}>
              <props.EndIcon />
            </div>
          ) : null}
        </button>
      ) : (
        <Link {...props.linkProps}>
          <a className={classes}>
            {props.startIcon ? <div className={iconClasses}>{props.startIcon}</div> : null}
            <strong>{props.children}</strong>
            {props.EndIcon ? (
              <div className={iconClasses}>
                <props.EndIcon />
              </div>
            ) : null}
          </a>
        </Link>
      )}

      {/* {props.disabled && (
        <button className={classes}>
          {props.startIcon && <div className={iconClasses}>{props.startIcon}</div>}
          <strong>{props.children}</strong>
          {props.EndIcon && (
            <div className={iconClasses}>
              <props.EndIcon disabled={props.disabled} />
            </div>
          )}
        </button>
      )} */}
    </div>
  );
};
// Propsのデフォルト値
Button.defaultProps = {
  bgColor: "blue",
  textColor: "black",
  disabled: false,
  className: "",
  // button: false,
  size: "small",
};
