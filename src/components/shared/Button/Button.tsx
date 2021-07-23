import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import type { ButtonType } from "./types";
import { useButtonClass } from "./useButtonClass";

/**
 * @package
 */
export const Button = forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
  const { children, className, variant, ...rest } = props;
  const classes = useButtonClass(className, variant);
  return (
    <button type="button" ref={ref as ForwardedRef<HTMLButtonElement>} {...rest} className={classes}>
      {children}
    </button>
  );
});

Button.displayName === "Button";
