import type { ReactNode, VFC } from "react";

type WidthContainerProps = { children: ReactNode };

export const WidthContainer: VFC<WidthContainerProps> = (props) => {
  return <div className="px-4 mx-auto max-w-screen-sm">{props.children}</div>;
};
