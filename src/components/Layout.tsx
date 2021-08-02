import type { ReactNode, VFC } from "react";
import type { HeaderProps } from "src/components/Header";
import { Header } from "src/components/Header";

type Props = HeaderProps & {
  children: ReactNode;
  isHeaderNarrow?: boolean;
};

export const Layout: VFC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, isHeaderNarrow, ...headerProps } = props;

  return (
    <div className="pb-20">
      <div
        className={`px-3 pt-4 pb-8 mx-auto sm:px-4 sm:pb-14 ${isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"}`}
      >
        <Header {...headerProps} />
      </div>
      <div className="px-4 mx-auto w-full max-w-screen-sm">{children}</div>
    </div>
  );
};
