import clsx from "clsx";
import type { ReactChild } from "react";
import classes from "src/components/sample/clsxSample.module.css";

type Props = {
  children: ReactChild;
  bold?: boolean;
};

// clsxのサンプル用
export const ClsxSample = (props: Props) => {
  // props.boldがtrueの場合のみ&&以降に指定したスタイルが適用される例
  // tailwindが導入されたら claases.~ がtailwindの文字列になる想定
  return <button className={clsx(classes.sample, props.bold && classes.bold)}>{props.children}</button>;
};
