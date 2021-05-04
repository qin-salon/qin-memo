import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import type { DOMAttributes, VFC } from "react";

type Link = {
  label: string | JSX.Element;
  href: string;
};
type Button = {
  label: string | JSX.Element;
  button: {
    label: JSX.Element;
    onClick: DOMAttributes<HTMLButtonElement>["onClick"];
    clickableAll?: boolean;
  };
};
type ListItem = Link | Button;
type ListProps = {
  title?: string | JSX.Element;
  items: [ListItem, ...ListItem[]];
};

const isButton = (item: ListItem): item is Button => {
  return "button" in item;
};

export const List: VFC<ListProps> = (props) => {
  return (
    <div className="space-y-1">
      {props.title ? <div className="text-sm font-bold text-gray-400">{props.title}</div> : null}
      <ul>
        {props.items.map((item, i) => {
          if (isButton(item)) {
            const handleClick = item.button.onClick;
            return (
              <li key={i}>
                {item.button.clickableAll ? (
                  <button
                    type="button"
                    onClick={handleClick}
                    className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100"
                  >
                    {item.label}
                    {item.button.label}
                  </button>
                ) : (
                  <div className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold">
                    {item.label}
                    <button type="button" onClick={handleClick}>
                      {item.button.label}
                    </button>
                  </div>
                )}
              </li>
            );
          }

          const isExternal = item.href.slice(0, 1) !== "/";
          return (
            <li key={i}>
              <Link href={item.href}>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                  {isExternal ? <ExternalLinkIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type RecursiveListProps = {
  list: [ListProps, ...ListProps[]];
};

export const RecursiveList: VFC<RecursiveListProps> = (props) => {
  return (
    <ul className="space-y-8">
      {props.list.map((listItems, i) => {
        return (
          <li key={i}>
            <List {...listItems} />
          </li>
        );
      })}
    </ul>
  );
};
