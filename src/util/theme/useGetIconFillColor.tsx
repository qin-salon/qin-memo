import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { ExtendUseThemeProps } from "./type";

/**
 * @package
 */
export const useGetIconFillColor = () => {
  const { resolvedTheme } = useTheme() as ExtendUseThemeProps;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    return setIsMounted(true);
  }, []);

  if (!isMounted) {
    return { fillColor: undefined };
  }

  return { fillColor: resolvedTheme === "light" ? "#070417" : "#fff" };
};
