import { useRouter } from "next/router";
import type { VFC } from "react";

import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";

/**
 * @package
 */
export type HeaderProps = Left & Center & Right & { isHeaderNarrow?: boolean };

/**
 * @package
 */
export const Header: VFC<HeaderProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { isHeaderNarrow, left, center, right } = props;

  const router = useRouter();
  if (router.query.client === "app") {
    return null;
  }

  return (
    <header
      className={`flex items-center px-3 mx-auto sm:px-4 ${isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"}`}
    >
      <Left left={left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={center} />
      </div>

      <Right right={right} />
    </header>
  );
};
