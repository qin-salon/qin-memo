import clsx from "clsx";
import Link from "next/link";
import type { ReactNode, VFC } from "react";

interface Props {
  id: string;
  color?: "blue" | "red" | "black" | "white" | "gray" | "orange";
  textColor?: "black" | "red" | "blue";
  disabled?: boolean;
  children?: ReactNode;
  type?: "button" | "link";
  linkProps?: string;
  className?: string;
  StartIcon?: VFC;
  EndIcon?: VFC;
  size?: "large" | "small";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: VFC<Props> = (props) => {
  // props受け取り、デフォルト値設定
  const {
    id,
    color = "bule",
    textColor = "black",
    disabled = false,
    className = "",
    children,
    type = "button",
    linkProps = "",
    StartIcon,
    EndIcon,
    size = "small",
    onClick,
  } = props;

  // ボタンのCSS
  const classes = clsx([
    " my-4 mx-auto rounded-full focus:outline-none flex flex-row justify-center",
    {
      "text-white bg-blue-500 hover:bg-blue-600": color === "blue" && disabled === false,
      "text-white bg-red-500 hover:bg-red-600": color === "red" && disabled === false,
      "text-white bg-yellow-500 hover:bg-yellow-600": color === "orange" && disabled === false,
      "text-black bg-gray-300 hover:bg-gray-400": color === "gray" && disabled === false,
      "text-white bg-black hover:bg-gray-500": color === "black" && disabled === false,
      " bg-white hover:bg-gray-300": color === "white" && disabled === false,
      "text-black": color === "white" && disabled === false && textColor === "black",
      "text-red-500": color === "white" && disabled === false && textColor === "red",
      "text-blue-500": color === "white" && disabled === false && textColor === "blue",
      "text-gray-400 bg-gray-300": disabled,
      "py-4 px-8": size === "large",
      "py-2 px-4": size === "small",
    },
    className,
  ]);
  const iconClasses = clsx([
    "my-auto",
    {
      "mx-3": size === "large",
      "mx-2": size === "small",
    },
  ]);

  const handleClick = () => {
    if (disabled) return null;
    return onClick;
  };
  return (
    <div className="mx-auto">
      {type === "button" && (
        <span data-testid={id} className={classes} onClick={handleClick}>
          {StartIcon && (
            <div className={iconClasses}>
              <StartIcon />
            </div>
          )}
          <strong>{children}</strong>
          {EndIcon && (
            <div className={iconClasses}>
              <EndIcon />
            </div>
          )}
        </span>
      )}

      {type === "link" && disabled === false && (
        <Link href={linkProps}>
          <span data-testid={id} className={classes} onClick={handleClick}>
            {StartIcon && (
              <div className={iconClasses}>
                <StartIcon />
              </div>
            )}
            <strong>{children}</strong>
            {EndIcon && (
              <div className={iconClasses}>
                <EndIcon />
              </div>
            )}
          </span>
        </Link>
      )}
    </div>
  );
};

export default Button;
