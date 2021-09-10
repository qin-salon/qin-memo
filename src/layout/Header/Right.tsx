import { Fragment, memo } from "react";

import { ICON_SIZE } from "./constant";
import { UserMenu } from "./UserMenu";

/**
 * @package
 */
export type Right = {
  right?: ("profile" | JSX.Element | undefined)[];
};

/**
 * @package
 */
export const Right = memo<Right>((props) => {
  if (!props.right) {
    return <div className={ICON_SIZE} />;
  }

  return (
    <div className="flex items-center space-x-2 h-10 sm:space-x-3">
      {props.right.map((item, i) => {
        return <Fragment key={i}>{item === "profile" ? <UserMenu /> : item}</Fragment>;
      })}
    </div>
  );
});

Right.displayName = "Right";
