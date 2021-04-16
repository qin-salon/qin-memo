import { Dialog, Transition } from "@headlessui/react";
import type { MutableRefObject, VFC } from "react";
import { Fragment, useRef } from "react";
import { Button } from "src/components/shared/Button";

type Props = {
  memoDelete: boolean;
  onDeleteModalClose: () => void;
  onMemoDeleteClick: () => void;
};

export const ConfirmDelete: VFC<Props> = (props) => {
  const cancelButtonRef = useRef() as MutableRefObject<HTMLElement | null>;

  return (
    <Transition show={props.memoDelete} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={props.memoDelete}
        onClose={props.onDeleteModalClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                メモ削除
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">復元できませんがよろしいですか？</p>
              </div>

              <div className="flex mt-4">
                <Button button bgColor="gray" className="w-28" onClick={props.onDeleteModalClose}>
                  <strong>キャンセル</strong>
                </Button>
                <Button button className="w-28" bgColor="red" onClick={props.onMemoDeleteClick}>
                  <strong>削除する</strong>
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
