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
      <Dialog static open={props.menuOpen} onClose={props.onMenuClose}>
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

        <div className="fixed bottom-0">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-200"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="w-screen bg-white py-4 px-6 rounded-t-2xl">
              <ModalContent {...props} />
            </div>
          </Transition.Child>
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
          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={props.onMenuClose}
        >
          <span className="sr-only">Close panel</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
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
          <p className="text-center m-2">
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
