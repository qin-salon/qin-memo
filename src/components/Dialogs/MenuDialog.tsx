import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import type { ReactNode, VFC } from "react";
import { Fragment, useRef } from "react";
import { Button } from "src/components/Buttons";

type MenuDialogProps = {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
};

/**
 * @package
 */
export const MenuDialog: VFC<MenuDialogProps> = (props) => {
  const buttonRef = useRef(null);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        static
        open={props.show}
        onClose={props.onClose}
        initialFocus={buttonRef}
        className="sm:overflow-y-auto sm:fixed sm:inset-0 sm:z-10"
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            // as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="sm:inline-block fixed sm:static bottom-0 w-full sm:max-w-md sm:align-middle sm:transform">
            <Transition.Child
              as={Fragment}
              enter="transform ease-in-out duration-300 sm:ease-out"
              enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
              enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
              leave="transform ease-in-out duration-200 sm:ease-in"
              leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
              leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
            >
              <div className="relative px-6 pt-20 pb-12 bg-white dark:bg-gray-800 sm:rounded-2xl rounded-t-3xl">
                <Button ref={buttonRef} variant="ghost" className="absolute top-4 right-5 p-2" onClick={props.onClose}>
                  <span className="sr-only">Close panel</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </Button>
                <div>{props.children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
