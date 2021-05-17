import { Dialog, Transition } from "@headlessui/react";
import { ClipboardCopyIcon, EyeIcon, EyeOffIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { Fragment } from "react";
import { TwitterIcon } from "src/components/icon/TwitterIcon";
import { Button } from "src/components/shared/Button";

type Props = {
  onDeleteModalOpen: () => void;
  menuOpen: boolean;
  onMenuClose: () => void;
  publicFlg: boolean;
  onPublicClick: () => void;
};

export const MemoMenu: VFC<Props> = (props) => {
  return (
    <Transition.Root show={props.menuOpen} as={Fragment}>
      <Dialog
        static
        open={props.menuOpen}
        onClose={props.onMenuClose}
        className="sm:fixed sm:inset-0 sm:z-10 sm:overflow-y-auto"
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
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

          <div className="fixed bottom-0 w-full sm:max-w-md sm:static sm:inline-block sm:align-middle sm:transform">
            <Transition.Child
              as={Fragment}
              enter="transform ease-in-out duration-300 sm:ease-out"
              enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
              enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
              leave="transform ease-in-out duration-200 sm:ease-in"
              leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
              leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
            >
              <div className="py-4 px-6 bg-white rounded-t-2xl sm:rounded-b-2xl">
                <ModalContent {...props} />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ModalContent: VFC<Omit<Props, "menuOpen">> = (props) => {
  return (
    <div>
      <div className="text-right">
        <button
          type="button"
          className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={props.onMenuClose}
        >
          <span className="sr-only">Close panel</span>
          <XIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      <div>
        {props.publicFlg ? (
          <Button
            button
            className="w-full"
            bgColor="gray"
            justifyContent="justify-between"
            group="top"
            endIcon={<EyeOffIcon className="w-5 h-5 text-blue-500" />}
            onClick={props.onPublicClick}
          >
            <strong>
              <span className="my-auto text-blue-500">非公開にする</span>
            </strong>
          </Button>
        ) : (
          <Button
            button
            className="w-full"
            bgColor="gray"
            justifyContent="justify-between"
            group="top"
            endIcon={<EyeIcon className="w-5 h-5 text-blue-500" />}
            onClick={props.onPublicClick}
          >
            <strong>
              <span className="my-auto text-blue-500">公開する</span>
            </strong>
          </Button>
        )}
        <Button
          button
          className="w-full"
          bgColor="gray"
          justifyContent="justify-between"
          group="bottom"
          endIcon={<TrashIcon className="w-5 h-5 text-gray-500" />}
          onClick={props.onDeleteModalOpen}
        >
          <strong>
            <span className="my-auto text-red-500">削除する</span>
          </strong>
        </Button>
        {props.publicFlg ? null : (
          <p className="m-2 text-center">
            <strong>以下は公開後に操作ができます</strong>
          </p>
        )}
        <Button
          button
          className="w-full"
          bgColor="gray"
          justifyContent="justify-between"
          group="top"
          disabled={!props.publicFlg}
          endIcon={<TwitterIcon disabled={!props.publicFlg} />}
        >
          <strong>
            <span className="my-auto">Twitterでシェアする</span>
          </strong>
        </Button>

        <Button
          button
          className="w-full"
          bgColor="gray"
          justifyContent="justify-between"
          group="bottom"
          disabled={!props.publicFlg}
          endIcon={<TwitterIcon disabled={!props.publicFlg} />}
        >
          <strong>
            <span className="my-auto">画像化してシェアする</span>
          </strong>
        </Button>
        <Button
          button
          className="w-full"
          bgColor="gray"
          justifyContent="justify-between"
          disabled={!props.publicFlg}
          endIcon={<ClipboardCopyIcon className={`w-5 h-5 ${props.publicFlg ? "" : "text-gray-500"}`} />}
        >
          <strong>
            <span className="my-auto">リンクをコピーする</span>
          </strong>
        </Button>
      </div>
    </div>
  );
};
