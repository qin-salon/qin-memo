import { useTheme } from "next-themes";
import { useMemo } from "react";

import type { ExtendUseThemeProps } from "./type";

/**
 * @package
 */
export const useGetIconFillColor = () => {
  const { resolvedTheme } = useTheme() as ExtendUseThemeProps;
  const fillColor = useMemo(() => {
    return resolvedTheme === "light" ? "#070417" : "#fff";
  }, [resolvedTheme]);

  return { fillColor };
};
