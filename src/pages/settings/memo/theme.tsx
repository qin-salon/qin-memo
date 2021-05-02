import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Header } from "src/components/shared/Header";

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
  const [mounted, setMounted] = useState(false);
  const { themes, theme: currentTheme, setTheme: handleTheme } = useTheme() as ExtendUseThemeProps;
  useEffect(() => {
    return setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Header page="setting" center="テーマ" left="back" />
      <div className="mx-auto max-w-screen-sm sm:mt-4">
        <RadioGroup value={currentTheme} onChange={handleTheme}>
          <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
          {[...themes].reverse().map((theme) => {
            return (
              <RadioGroup.Option
                key={theme}
                value={theme}
                className={({ active, checked }) => {
                  return clsx("cursor-pointer", {
                    "bg-gray-50 dark:bg-black": checked || active,
                  });
                }}
              >
                {({ checked }) => {
                  return (
                    <div className="flex justify-between items-center py-3 px-4 text-lg hover:bg-gray-50 dark:hover:bg-black">
                      <RadioGroup.Label className="font-bold text-gray-900 dark:text-white">
                        {THEME_LANG[theme]}
                      </RadioGroup.Label>
                      {checked ? <CheckIcon className="w-6 h-6 text-blue-500" /> : null}
                    </div>
                  );
                }}
              </RadioGroup.Option>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default SettingsMemoTheme;
