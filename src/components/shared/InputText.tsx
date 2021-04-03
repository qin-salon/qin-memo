import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";

type CommonType = {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  bgColor?: "white" | "gray";
  textColor?: "black" | "glay";
  startIcon?: JSX.Element;
};

type TextareaType = CommonType & {
  multiline: boolean;
  maxLength?: number;
  rows?: number;
  onChange?: DOMAttributes<HTMLTextAreaElement>["onChange"];
};
type InputType = CommonType & {
  onChange?: DOMAttributes<HTMLInputElement>["onChange"];
};

// props の型がinput型かtextarea型かを判断する関数を定義する。
// props に multiline を持っている場合は true
const isTextarea = (props: TextareaType | InputType): props is TextareaType => {
  return "multiline" in props;
};

export const InputText: VFC<TextareaType | InputType> = (props) => {
  // テキストボックスにフォーカスがある場合にボーダーラインの表示を切り替える
  const divClasses = clsx([
    "flex text-center my-auto outline-none transition-colors",
    {
      "bg-gray-100": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
      "h-10 pl-3 pr-10 rounded-full": !isTextarea(props),
      "p-4": isTextarea(props),
    },
    props.className,
  ]);
  const inputClasses = clsx([
    "w-full m-0 p-0 border-white outline-none my-auto",
    {
      "bg-gray-100": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
    },
  ]);
  const labelClasses = clsx([
    {
      "text-black": props.textColor === "black",
      "text-gray-200": props.textColor === "glay",
    },
  ]);
  return (
    <div className="flex flex-col">
      {props.label ? (
        <div>
          <span className={labelClasses}>{props.label}</span>
        </div>
      ) : null}
      <div className={divClasses}>
        {/* 先頭にアイコンを表示する */}
        {props.startIcon ? props.startIcon : null}
        {/* 複数行表示と切り替える */}
        {isTextarea(props) ? (
          <textarea
            className={inputClasses}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            rows={props.rows}
            value={props.value}
            onChange={props.onChange}
          />
        ) : (
          <input
            type="text"
            className={inputClasses}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      </div>
    </div>
  );
};
// Propsのデフォルト値
InputText.defaultProps = {
  bgColor: "gray",
  textColor: "black",
};
