import type { useTheme as useNextTheme } from "next-themes";

/**
 * @package
 */
export type ExtendUseThemeProps = ReturnType<typeof useNextTheme> & {
  theme: "system" | "light" | "dark";
  resolvedTheme: "light" | "dark";
};
