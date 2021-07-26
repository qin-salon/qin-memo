import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

type ExtendUseThemeProps = ReturnType<typeof useNextTheme> & {
  theme: "system" | "light" | "dark";
  resolvedTheme: "light" | "dark";
};

export const useTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme: currentTheme, setTheme: handleTheme } = useNextTheme() as ExtendUseThemeProps;
  const themes = useMemo(() => {
    return [
      { id: "system", label: "端末の設定に合わせる" },
      { id: "light", label: "ライト" },
      { id: "dark", label: "ダーク" },
    ] as const;
  }, []);
  useEffect(() => {
    return setIsMounted(true);
  }, []);

  return { themes, isMounted, currentTheme, handleTheme };
};

export const useGetIconFillColor = () => {
  const { resolvedTheme } = useNextTheme() as ExtendUseThemeProps;
  const fillColor = useMemo(() => {
    return resolvedTheme === "light" ? "#070417" : "#fff";
  }, [resolvedTheme]);

  return { fillColor };
};
