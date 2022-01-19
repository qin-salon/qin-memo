import { Dialog, Transition } from "@headlessui/react";
import type { DOMAttributes, VFC } from "react";
import { Fragment, useRef } from "react";
import { Button } from "src/component/Button";

type Props = {
  show: boolean;
  onClose: () => void;
  onClickOk: DOMAttributes<HTMLButtonElement>["onClick"];
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "blue" | "red";
};

/**
 * @package
 */
export const ConfirmDialog: VFC<Props> = (props) => {
  const buttonRef = useRef(null);

  return (
    <Transition show={props.show} as={Fragment}>
      <Dialog
        static
        className="overflow-y-auto fixed inset-0 z-10"
        open={props.show}
        onClose={props.onClose}
        initialFocus={buttonRef}
      >
        <div className="flex justify-center items-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="inline-block overflow-hidden z-10 p-4 w-10/12 max-w-sm text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all sm:p-6">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6">
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm opacity-70">{props.description}</p>
                </div>
              </div>
              <div className="flex mt-6 space-x-3 sm:space-x-4">
                <Button variant="outline" className="flex-1 py-2 text-sm" onClick={props.onClose} ref={buttonRef}>
                  キャンセル
                </Button>
                <Button
                  variant={props.buttonColor === "blue" ? "solid-blue" : "solid-red"}
                  className="flex-1 py-2 text-sm"
                  onClick={props.onClickOk}
                >
                  {props.buttonText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
