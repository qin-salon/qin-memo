import type { ReactNode, VFC } from "react";

import type { HeaderProps } from "./Header";
import { Header } from "./Header";

type Props = HeaderProps & { children: ReactNode; isHeaderNarrow?: boolean };

/**
 * @package
 */
export const Layout: VFC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, ...rest } = props;

  return (
    <div className="pt-4 pb-20 space-y-8 sm:space-y-14">
      <Header {...rest} />
      <main className="px-4 mx-auto w-full max-w-screen-sm">{children}</main>
    </div>
  );
};
