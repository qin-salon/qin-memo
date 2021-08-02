import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { NextPage } from "next";
import { Layout } from "src/component/Layout";
import { useTheme } from "src/context/theme";

const SettingsMemoTheme: NextPage = () => {
  const { themes, isMounted, currentTheme, handleTheme } = useTheme();
  if (!isMounted) return null;

  return (
    <Layout left="back" center="テーマ">
      <RadioGroup value={currentTheme} onChange={handleTheme}>
        <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
        {themes.map((theme) => {
          return (
            <RadioGroup.Option
              key={theme.id}
              value={theme.id}
              className={({ active, checked }) => {
                return clsx("-mx-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none", {
                  "bg-gray-100 dark:bg-gray-700": checked || active,
                });
              }}
            >
              {({ checked }) => {
                return (
                  <div className="flex justify-between items-center py-3 px-4 text-lg">
                    <RadioGroup.Label className="font-bold">{theme.label}</RadioGroup.Label>
                    {checked ? <CheckIcon className="w-6 h-6 text-blue-500" /> : null}
                  </div>
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
