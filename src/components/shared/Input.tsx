import type { InputHTMLAttributes, VFC } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  prefix?: string;
  error?: string;
};

export const Input: VFC<InputProps> = (props) => {
  return (
    <div className="block">
      <label htmlFor={props.name}>
        <div className="block ml-4 text-sm font-bold text-gray-500">{props.label}</div>
        <div className="relative">
          {props.prefix ? (
            <span className="flex absolute left-5 items-center h-full font-bold">{props.prefix}</span>
          ) : null}
          <input
            type="text"
            id={props.name}
            className={`py-6 pr-5 mt-0.5 w-full h-10 font-bold bg-gray-100 dark:bg-gray-700 rounded-full dark:focus:bg-gray-600 border-none focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              props.prefix ? "pl-10" : "pl-5"
            }`}
            autoComplete="off"
            {...props}
          />
        </div>
      </label>
      {props.error ? <p className="mt-0.5 ml-4 text-sm text-red-500">{props.error}</p> : null}
    </div>
  );
};
