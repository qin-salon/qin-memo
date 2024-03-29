import { forwardRef } from "react";

import type { ButtonType } from "./type";
import { useButtonClass } from "./useButtonClass";

/**
 * @package
 */
export const Button = forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
  const { children, className, variant, ...rest } = props;
  const classes = useButtonClass(className, variant);
  return (
    <button type="button" ref={ref} {...rest} className={classes}>
      {children}
    </button>
  );
});

Button.displayName === "Button";
