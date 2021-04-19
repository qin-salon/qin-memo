import { Dialog, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { Fragment } from "react";
import { ClipboardCopy } from "src/components/icon/ClipboardCopy";
import { EyeIcon } from "src/components/icon/EyeIcon";
import { EyeOffIcon } from "src/components/icon/EyeOffIcon";
import { TrashIcon } from "src/components/icon/TrashIcon";
import { TwitterIcon } from "src/components/icon/TwitterIcon";
import { XIcon } from "src/components/icon/XIcon";
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
        <Dialog.Overlay className="absolute inset-0 bg-black opacity-40" />
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
            endIcon={<EyeOffIcon />}
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
            endIcon={<EyeIcon />}
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
          endIcon={<TrashIcon />}
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
          endIcon={<ClipboardCopy disabled={!props.publicFlg} />}
        >
          <strong>
            <span className="my-auto">リンクをコピーする</span>
          </strong>
        </Button>
      </div>
    </div>
  );
};
