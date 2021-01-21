import { useTheme } from "next-themes";
import type { VFC } from "react";
import { useEffect, useState } from "react";

const ThermeChangerSample: VFC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const swithchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  if (!isMounted) return null;
  return (
    <button
      onClick={swithchTheme}
      type="button"
      className="bg-gray-200     text-gray-700   hover:bg-gray-300 px-4 py-2 m-2 ease select-none　focus:shadow-outline
                dark:bg-blue-800 dark:text-white dark:hover:bg-blue-900"
    >
      {theme}
    </button>
  );
};
export { ThermeChangerSample };
