import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";
import { SearchIcon } from "src/components/icon/SearchIcon";

type CommonType = {
  bgColor?: "blue" | "red" | "black" | "white" | "gray" | "orange" | "transparent";
  textColor?: "black" | "red" | "blue";
  disabled?: boolean;
  className?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  size?: "large" | "middle" | "small";
  id?: string;
};

type InputType = CommonType & {
  type?: "text" | "search" | "password";
  value?: string;
  placeholder?: string;
  onChange?: DOMAttributes<HTMLInputElement>["onChange"];
};

export const BasicTextBox: VFC<InputType> = (props) => {
  const classes = clsx("my-4 mx-auto rounded-full focus:outline-none flex flex-row justify-between box-border", {
    "py-4 px-7": props.size === "large",
    "py-3 px-6": props.size === "middle",
    "py-2 px-4": props.size === "small",
  });

  const textboxClasses = clsx("w-full focus:outline-none bg-transparent");

  // 未着手
  const colorClasses = clsx({
    "text-black bg-blue-50 hover:border-2 hover:border-blue-200": props.bgColor === "blue",
    "text-black bg-red-50 hover:border-2 hover:border-red-200": props.bgColor === "red",
    "text-black bg-yellow-50 hover:border-2 hover:border-yellow-200": props.bgColor === "orange",
    "text-black bg-gray-50 hover:border-2 hover:border-gray-200": props.bgColor === "gray",
    "text-black bg-gray-50 hover:border-2 hover:border-black": props.bgColor === "black",
    "bg-white hover:border-2 hover:border-gray-200": props.bgColor === "white",
    "bg-transparent": props.bgColor === "transparent",
    "text-black": props.bgColor === "white" && props.textColor === "black",
    "text-red-500": props.bgColor === "white" && props.textColor === "red",
    "text-blue-500": props.bgColor === "white" && props.textColor === "blue",
  });

  const iconClasses = clsx("my-auto", {
    "mr-3": props.startIcon && props.size === "large",
    "mr-2": props.startIcon && props.size !== "large",
    "ml-3": props.endIcon && props.size === "large",
    "ml-2": props.endIcon && props.size !== "large",
  });

  return (
    <div>
      <div className={clsx("text-black bg-white", classes, colorClasses, props.className)}>
        {props.type === "search" ? <SearchIcon size={props.size} /> : null}
        {props.startIcon ? <span className={iconClasses}>{props.startIcon}</span> : null}
        <input
          className={clsx(textboxClasses)}
          id={props.id}
          type={props.type}
          autoComplete="off"
          spellCheck="false"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.endIcon ? <span className={iconClasses}>{props.endIcon}</span> : null}
      </div>
    </div>
  );
};

// Propsのデフォルト値
BasicTextBox.defaultProps = {
  type: "search",
  placeholder: "検索",
  value: "",
  bgColor: "blue",
  textColor: "black",
  size: "small",
};
