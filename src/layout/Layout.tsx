import type { ReactNode, VFC } from "react";

import type { HeaderProps } from "./Header";
import { Header } from "./Header";

type Props = HeaderProps & { children: ReactNode; isHeaderNarrow?: boolean };

/**
 * @package
 */
export const Layout: VFC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, isHeaderNarrow, ...headerProps } = props;

  return (
    <div className="pb-20">
      <div className={`mx-auto ${isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"}`}>
        <Header {...headerProps} />
      </div>
      <div className="px-4 mx-auto w-full max-w-screen-sm">{children}</div>
    </div>
  );
};
