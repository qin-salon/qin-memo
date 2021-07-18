import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";

type MenuItem = {
  label: string;
  labelColor?: "blue" | "red";
  icon: JSX.Element;
  iconColor?: "blue" | "red" | "twitter";
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
};

export type NoteMenuProps = {
  menu: (MenuItem[] | string | undefined)[];
};

export const NoteMenu: VFC<NoteMenuProps> = (props) => {
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
                        "hover:bg-gray-200 dark:hover:bg-gray-600": !props.disabled,
                        "text-gray-400 text-opacity-50 cursor-not-allowed": props.disabled,
                      }
                    )}
                    onClick={props.onClick}
                    disabled={props.disabled}
                  >
                    <div
                      className={clsx("flex-1 font-bold", {
                        "text-blue-500": !props.disabled && props.labelColor === "blue",
                        "text-red-500": !props.disabled && props.labelColor === "red",
                      })}
                    >
                      {props.label}
                    </div>
                    <div
                      className={clsx("flex-shrink-0 w-5 h-5", {
                        "text-blue-500": !props.disabled && props.iconColor === "blue",
                        "text-red-500": !props.disabled && props.iconColor === "red",
                        "text-blue-400": !props.disabled && props.iconColor === "twitter",
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
