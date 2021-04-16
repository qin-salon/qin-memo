import { Dialog, Transition } from "@headlessui/react";
import type { MutableRefObject, VFC } from "react";
import { Fragment, useRef } from "react";
import { ClipboardCopy } from "src/components/icon/ClipboardCopy";
import { DotsCircleHorizontalIcon } from "src/components/icon/DotsCircleHorizontalIcon";
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
  const cancelButtonRef = useRef() as MutableRefObject<HTMLElement | null>;

  return (
    <>
      <Transition show={props.menuOpen} as={Fragment}>
        <Dialog
          as="div"
          id="modal"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={props.menuOpen}
          onClose={props.onMenuClose}
        >
          <div className="min-h-screen px-4 text-center items-end">
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

            <span className="block h-screen align-middle bottom-0" aria-hidden="true">
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
              <div className="inline-block w-full max-w-md px-6 pb-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl">
                <header className="flex">
                  <div className="flex-auto" />
                  <div>
                    <Button
                      button
                      className="hover:bg-gray-100 rounded-full ml-auto"
                      bgColor="gray"
                      onClick={props.onMenuClose}
                    >
                      <XIcon />
                    </Button>
                  </div>
                </header>
                <main>
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
                  <Button
                    button
                    className="w-full"
                    bgColor="gray"
                    justifyContent="justify-between"
                    disabled={!props.publicFlg}
                    endIcon={<DotsCircleHorizontalIcon disabled={!props.publicFlg} />}
                  >
                    <strong>
                      <span className="my-auto">その他オプション</span>
                    </strong>
                  </Button>
                </main>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
