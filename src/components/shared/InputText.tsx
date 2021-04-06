import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  bgColor?: "white" | "gray";
  textColor?: "black" | "glay";
  startIcon?: JSX.Element;
  onChange?: DOMAttributes<HTMLInputElement>["onChange"];
};

export const InputText: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col">
      {props.label ? (
        <div>
          <span
            className={clsx([
              {
                "text-black": props.textColor === "black",
                "text-gray-200": props.textColor === "glay",
              },
            ])}
          >
            {props.label}
          </span>
        </div>
      ) : null}
      <div
        className={clsx([
          "flex text-center my-auto outline-none transition-colors",
          {
            "bg-gray-100": props.bgColor === "gray",
            "bg-white": props.bgColor === "white",
            "h-10 pl-3 pr-10 rounded-full": true,
          },
          props.className,
        ])}
      >
        {/* 先頭にアイコンを表示する */}
        {props.startIcon ? props.startIcon : null}
        <input
          type="text"
          className={clsx([
            "w-full m-0 p-0 border-white outline-none my-auto",
            {
              "bg-gray-100": props.bgColor === "gray",
              "bg-white": props.bgColor === "white",
            },
          ])}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

// Propsのデフォルト値
InputText.defaultProps = {
  bgColor: "gray",
  textColor: "black",
};
