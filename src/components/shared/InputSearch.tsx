import { SearchIcon } from "@heroicons/react/outline";
import type { InputHTMLAttributes, VFC } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputSearch: VFC<Props> = (props) => {
  return (
    <div className="flex items-center pr-7 pl-3 h-10 bg-gray-100 rounded-full outline-none">
      <SearchIcon className="mr-2 w-6 h-6 text-blue-500" />
      <input type="text" {...props} className="p-0 m-0 my-auto w-full bg-gray-100 border-white outline-none" />
    </div>
  );
};