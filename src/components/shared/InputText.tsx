import clsx from "clsx";
import type { DOMAttributes } from "react";

type CommonType = {
  id: string;
  title?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  bgColor?: "white" | "gray";
  startIcon?: JSX.Element;
};

type textareaType = CommonType & {
  multiline?: boolean;
  maxLength?: number;
  rows?: number;
  onChange?: DOMAttributes<HTMLTextAreaElement>["onChange"];
};
type inputType = CommonType & {
  onChange?: DOMAttributes<HTMLInputElement>["onChange"];
};

// props の型がinput型かtextarea型かを判断する関数を定義する。
// props に multiline を持っている場合は true
const isTextarea = (props: textareaType | inputType): props is textareaType => {
  return "multiline" in props;
};

export const InputText: React.FC<textareaType | inputType> = (props) => {
  // テキストボックスにフォーカスがある場合にボーダーラインの表示を切り替える
  const divStyle = clsx([
    "flex text-center h-10 my-auto pl-3 pr-10  rounded-xl border-2 transition-colors",
    {
      "bg-gray-200": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
    },
    props.className,
  ]);
  const inputStyle = clsx([
    "w-full m-0 p-0 border-white outline-none",
    {
      "bg-gray-200": props.bgColor === "gray",
      "bg-white": props.bgColor === "white",
    },
  ]);

  return (
    <div className={divStyle}>
      {/* 先頭にアイコンを表示する */}
      {props.startIcon ? props.startIcon : null}
      {/* 複数行表示と切り替える */}
      {isTextarea(props) ? (
        <textarea
          className={inputStyle}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          rows={props.rows}
          value={props.value}
        />
      ) : (
        <input type="text" className={inputStyle} placeholder={props.placeholder} value={props.value} />
      )}
    </div>
  );
};
// Propsのデフォルト値
InputText.defaultProps = {
  bgColor: "gray",
};
