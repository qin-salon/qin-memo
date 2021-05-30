import type { InputHTMLAttributes, VFC } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  prefix?: string;
  error?: string;
};

export const Input: VFC<InputProps> = (props) => {
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="block ml-4 text-sm font-bold text-gray-500">
        {props.label}
      </label>
      <div className="flex py-3 px-5 mt-0.5 text-gray-800 bg-gray-100 rounded-full">
        {props.prefix ? <span className="pr-1 font-bold">{props.prefix}</span> : null}
        <input
          type="text"
          id={props.name}
          className="w-full font-bold bg-transparent outline-none"
          autoComplete="off"
          {...props}
        />
      </div>
      {props.error ? <p className="mt-1 text-sm text-red-600">{props.error}</p> : null}
    </div>
  );
};
