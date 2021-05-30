import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";
import { useRef } from "react";
import { Fragment } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onClickOk: DOMAttributes<HTMLButtonElement>["onClick"];
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "blue" | "red";
};

export const ConfirmDialog: VFC<Props> = (props) => {
  const buttonRef = useRef(null);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        static
        className="overflow-y-auto fixed inset-0 z-10"
        open={props.show}
        onClose={props.onClose}
        initialFocus={buttonRef}
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="inline-block overflow-hidden p-4 sm:p-6 w-10/12 max-w-sm text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6 text-gray-900">
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.description}</p>
                </div>
              </div>
              <div className="flex mt-6 space-x-3 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex flex-1 justify-center py-2 w-auto text-sm font-bold text-gray-700 hover:text-gray-500 bg-white rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                  onClick={props.onClose}
                  ref={buttonRef}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  className={clsx(
                    "inline-flex flex-1 justify-center py-2 w-auto text-sm font-bold text-white rounded-full border border-transparent focus:ring-2 focus:ring-offset-2 shadow-sm focus:outline-none",
                    {
                      "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500": props.buttonColor === "blue",
                      "bg-red-600 hover:bg-red-700 focus:ring-red-500": props.buttonColor === "red",
                    }
                  )}
                  onClick={props.onClickOk}
                >
                  {props.buttonText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
