import { memo } from "react";

import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";

/**
 * @package
 */
export const Header = memo<Left & Center & Right>((props) => {
  return (
    <header className="flex items-center">
      <Left left={props.left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={props.center} />
      </div>

      <Right right={props.right} />
    </header>
  );
});

Header.displayName = "Header";
