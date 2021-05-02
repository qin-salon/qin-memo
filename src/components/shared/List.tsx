import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Link from "next/link";
import type { VFC } from "react";

type ListItem = { label: string; href: string };

type ListProps = {
  title: string;
  items: [ListItem, ...ListItem[]];
};

export const List: VFC<ListProps> = (props) => {
  return (
    <div>
      <div className="px-4 text-sm font-bold text-gray-400">{props.title}</div>
      <ul className="mt-2">
        {props.items.map((item) => {
          const isExternal = item.href.slice(0, 1) !== "/";
          return (
            <li key={item.href}>
              <Link href={item.href}>
                <a
                  className="flex justify-between items-center py-3 px-4 text-lg font-bold hover:bg-gray-50"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span>{item.label}</span>
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
      {props.list.map((listItems) => {
        return (
          <li key={listItems.title}>
            <List {...listItems} />
          </li>
        );
      })}
    </ul>
  );
};
