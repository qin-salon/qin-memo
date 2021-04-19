import { Dialog, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { Fragment } from "react";

type Props = { memoDelete: boolean; onDeleteModalClose: () => void; onMemoDeleteClick: () => void };

export const ConfirmDelete: VFC<Props> = (props) => {
  return (
    <Transition.Root show={props.memoDelete} as={Fragment}>
      <Dialog
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.memoDelete}
        onClose={props.onDeleteModalClose}
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

          <span className="inline-block align-middle h-screen" aria-hidden="true">
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
            <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-sm w-10/12 p-4 sm:p-6">
              <div className="text-center">
                <Dialog.Title as="h3" className="leading-6 font-bold text-gray-900">
                  メモを削除
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">復元できませんがよろしいですか？</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm flex-1 py-2 bg-white font-bold text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-auto text-sm"
                  onClick={props.onDeleteModalClose}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-full border border-transparent shadow-sm flex-1 py-2 bg-red-600 font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto text-sm"
                  onClick={props.onMemoDeleteClick}
                >
                  削除する
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
