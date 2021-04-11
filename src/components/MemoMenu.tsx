import type { VFC } from "react";
import { ClipboardCopy } from "src/components/icon/ClipboardCopy";
import { DotsCircleHorizontalIcon } from "src/components/icon/DotsCircleHorizontalIcon";
import { EyeIcon } from "src/components/icon/EyeIcon";
import { EyeOffIcon } from "src/components/icon/EyeOffIcon";
import { TrashIcon } from "src/components/icon/TrashIcon";
import { TwitterIcon } from "src/components/icon/TwitterIcon";
import { XIcon } from "src/components/icon/XIcon";
import { Button } from "src/components/shared/Button";
import { Modal } from "src/components/shared/Modal";

type Props = {
  memoDelete: boolean;
  onDeleteModalClose: () => void;
  onDeleteModalOpen: () => void;
  onMemoDeleteClick: () => void;
  menuOpen: boolean;
  onMenuClose: () => void;
  publicFlg: boolean;
  onPublicClick: () => void;
};

export const MemoMenu: VFC<Props> = (props) => {
  return (
    <>
      <Modal className="max-w-md h-44" open={props.memoDelete} onClick={props.onDeleteModalClose}>
        <div className="h-8 text-center mt-6">
          <strong>メモを削除</strong>
        </div>
        <div className="ml-8 mt-2">
          <span>復元できませんがよろしいですか？</span>
        </div>
        <div className="flex flex-row mt-2">
          <Button button bgColor="gray" className="w-28" onClick={props.onDeleteModalClose}>
            <strong>キャンセル</strong>
          </Button>
          <Button button className="w-28" bgColor="red" onClick={props.onMemoDeleteClick}>
            <strong>削除する</strong>
          </Button>
        </div>
      </Modal>
      <Modal className="max-w-md" open={props.menuOpen} onClick={props.onMenuClose} drawer>
        <div className="p-4">
          <header className="justify-items-end">
            <Button button className="hover:bg-gray-100 rounded-full" bgColor="gray" onClick={props.onMenuClose}>
              <XIcon />
            </Button>
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
      </Modal>
    </>
  );
};
