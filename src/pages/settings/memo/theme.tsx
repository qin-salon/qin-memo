import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Layout } from "src/components/shared/Layout";

type Theme = "system" | "light" | "dark";

type ExtendUseThemeProps = ReturnType<typeof useTheme> & {
  theme: Theme;
  themes: Theme[];
};

const THEME_LANG = {
  system: "端末の設定に合わせる",
  light: "ライト",
  dark: "ダーク",
};

const SettingsMemoTheme: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { themes, theme: currentTheme, setTheme: handleTheme } = useTheme() as ExtendUseThemeProps;
  useEffect(() => {
    return setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Layout left="back" center="テーマ">
      <RadioGroup value={currentTheme} onChange={handleTheme}>
        <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
        {[...themes].reverse().map((theme) => {
          return (
            <RadioGroup.Option
              key={theme}
              value={theme}
              className={({ active, checked }) => {
                return clsx(
                  "flex justify-between items-center py-3 px-4 -mx-4 text-lg hover:bg-gray-100 dark:hover:bg-black cursor-pointer",
                  { "bg-gray-100 dark:bg-black": checked || active }
                );
              }}
            >
              {({ checked }) => {
                return (
                  <>
                    <RadioGroup.Label className="font-bold text-gray-900 dark:text-white">
                      {THEME_LANG[theme]}
                    </RadioGroup.Label>
                    {checked ? <CheckIcon className="w-6 h-6 text-blue-500" /> : null}
                  </>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    </Layout>
  );
};

export default SettingsMemoTheme;
