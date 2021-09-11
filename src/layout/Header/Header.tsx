import { useRouter } from "next/router";
import type { VFC } from "react";

import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";

/**
 * @package
 */
export type HeaderProps = Left & Center & Right;

/**
 * @package
 */
export const Header: VFC<HeaderProps> = (props) => {
  const router = useRouter();
  if (router.query.client === "app") {
    return null;
  }

  return (
    <header className="flex items-center">
      <Left left={props.left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={props.center} />
      </div>

      <Right right={props.right} />
    </header>
  );
};
