import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";

type MenuListItem = {
  label: string;
  labelColor?: "blue" | "red";
  icon: JSX.Element;
  iconColor?: "blue" | "red" | "twitter";
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
  disabledColor?: boolean;
};

/**
 * @package
 */
export type MenuDialogListProps = {
  menu: (MenuListItem[] | string | undefined)[];
};

/**
 * @package
 */
export const MenuDialogList: VFC<MenuDialogListProps> = (props) => {
  return (
    <div className="space-y-5">
      {props.menu.map((item, i) => {
        if (!item) return null;

        if (typeof item === "string") {
          return (
            <div key={i} className="font-bold">
              {item}
            </div>
          );
        }

        return (
          <ul key={i}>
            {item.map((props) => {
              return (
                <li key={props.label} className="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl">
                  <button
                    className={clsx(
                      "flex items-center py-3 px-6 w-full text-left bg-gray-100 focus:bg-gray-200 dark:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none",
                      {
                        "hover:bg-gray-200 dark:hover:bg-gray-600": !props.disabledColor,
                        "text-gray-400 opacity-50 cursor-not-allowed": props.disabledColor,
                      }
                    )}
                    onClick={props.onClick}
                    disabled={props.disabled}
                  >
                    <div
                      className={clsx("flex-1 font-bold", {
                        "text-blue-500": !props.disabledColor && props.labelColor === "blue",
                        "text-red-500": !props.disabledColor && props.labelColor === "red",
                      })}
                    >
                      {props.label}
                    </div>
                    <div
                      className={clsx("shrink-0 w-5 h-5", {
                        "text-blue-500": !props.disabledColor && props.iconColor === "blue",
                        "text-red-500": !props.disabledColor && props.iconColor === "red",
                        "text-blue-400": !props.disabledColor && props.iconColor === "twitter",
                      })}
                    >
                      {props.icon}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
