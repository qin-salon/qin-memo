import { SearchIcon } from "@heroicons/react/outline";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

/**
 * @package
 */
export const Search = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <label className="block relative">
      <div className="grid absolute top-0 z-0 place-items-center w-14 h-10">
        <SearchIcon className="w-5 h-5 text-blue-500" />
      </div>
      <input
        type="text"
        ref={ref}
        {...props}
        className="pl-12 m-0 my-auto w-full h-10 bg-gray-100 dark:bg-gray-700 dark:focus:bg-transparent rounded-full border-none focus:ring-2 focus:ring-blue-400 cursor-text"
      />
    </label>
  );
});

Search.displayName = "Search";
