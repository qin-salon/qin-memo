import type { DOMAttributes } from "react";

type AllOrNone<T> = T | { [Key in keyof T]?: never };

type Link = {
  label: string | JSX.Element;
  href: string;
};

type ComponentButton = { label: string | JSX.Element; button: JSX.Element };

type AllButton = { label: string | JSX.Element; onClick: DOMAttributes<HTMLButtonElement>["onClick"] };

type Button = ComponentButton | AllButton;

type ListItem = Link | Button;

type ListProps = { title?: string | JSX.Element; items: [ListItem, ...ListItem[]] };

const isLink = (item: ListItem): item is Link => {
  return "href" in item;
};

const hasButton = (item: Button): item is ComponentButton => {
  return "button" in item;
};

/**
 * @package
 */
export type { AllOrNone, ListProps };

/**
 * @package
 */
export { hasButton, isLink };
