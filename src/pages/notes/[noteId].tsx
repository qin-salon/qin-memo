import type { NextPage } from "next";
import { useRouter } from "next/router";
import Router from "next/router";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CheckCircle } from "src/components/icon/CheckCircle";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { ClipboardCopy } from "src/components/icon/ClipboardCopy";
import { DotsCircleHorizontalIcon } from "src/components/icon/DotsCircleHorizontalIcon";
import { EyeIcon } from "src/components/icon/EyeIcon";
import { EyeOffIcon } from "src/components/icon/EyeOffIcon";
import { TrashIcon } from "src/components/icon/TrashIcon";
import { TwitterIcon } from "src/components/icon/TwitterIcon";
import { XIcon } from "src/components/icon/XIcon";
import { Button } from "src/components/shared/Button";
import { Modal } from "src/components/shared/Modal";
import type { NotePostRequest, NotePutRequest, NoteType } from "src/types/types";
import useSWR from "swr";

const InitialData: NoteType = {
  id: "0",
  content: "",
  public: false,
};

const Note: NextPage = () => {
  const router = useRouter();
  const { data: note, mutate: noteMutate } = useSWR<NoteType>(`/notes/${router.query.noteId}`, {
    initialData: InitialData,
  });

  const [content, setContent] = useState("");
  const [publicDisp, setPublicDisp] = useState(false);
  const [publicOpen, setPublicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [memoDelete, setMemoDelete] = useState(false);

  useEffect(() => {
    setContent(note?.content || "");
  }, [note?.content]);

  // if (!note) return <div>loading</div>;

  // ===================================
  // 入力値の保存
  // ===================================
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  // ===================================
  // メモ公開後のボタンクローズ
  // ===================================
  const handlePublicClose = () => {
    setPublicOpen(!publicOpen);
  };

  // ===================================
  // メニューオープン
  // ===================================
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  // ===================================
  // メニュークローズ
  // ===================================
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  // ===================================
  // 削除確認画面起動・閉じる
  // ===================================
  const handleDeleteModalClick = () => {
    setMemoDelete(!memoDelete);
  };
  // ===================================
  // 削除確認画面起動・閉じる
  // ===================================
  const handleDeleteModalOpen = () => {
    setMemoDelete(true);
    setMenuOpen(false);
  };
  // ===================================
  // 公開する・しないの切替
  // ===================================
  const handlePublicClick = () => {
    if (!publicDisp) {
      setPublicOpen(true);
    }
    setPublicDisp(!publicDisp);
    setMenuOpen(false);
  };
  // ===================================
  // メモ更新
  // ===================================
  const handleContentSave = () => {
    const feachUpdate = async () => {
      if (note?.id === "0") {
        // 登録処理
        const req: NotePostRequest = { content: content, public: false };
        // postメソッド
        await fetch("/notes", {
          method: "post",
          body: JSON.stringify(req),
        });
      } else {
        // 更新処理
        if (note) {
          const req: NotePutRequest = { id: note.id, content: content };
          // putメソッド
          await fetch(`/notes/${router.query.noteId}`, {
            method: "put",
            body: JSON.stringify(req),
          });
        }
      }

      await noteMutate;
    };
    Router.push("/");
    feachUpdate;
  };

  return (
    <div className="max-w-screen-sm mx-auto h-screen flex flex-col">
      <div className="relative flex justify-around">
        <Button button bgColor="transparent" textColor="black" onClick={handleContentSave}>
          <ChevronLeft />
        </Button>
        <div className="flex-auto" />

        <div className="mt-5">
          {note?.public ? (
            <span className="py-1 px-1 my-0 mx-auto rounded-full w-auto text-xs text-white bg-yellow-500">公開中</span>
          ) : null}
        </div>
        <Button button bgColor="transparent" textColor="black" onClick={handleMenuOpen}>
          <DotsCircleHorizontalIcon />
        </Button>
      </div>
      <div className="h-full w-full p-4 outline-none transition-colors">
        <textarea
          className="min-h-full w-full px-2 outline-none transition-colors"
          value={content}
          onChange={handleContentChange}
          placeholder="本文を入力する"
        />
      </div>
      {publicOpen ? (
        <div className="z-50 absolute left-1/2 transform -translate-x-1/2">
          <Button button startIcon={<CheckCircle />} onClick={handlePublicClose}>
            メモを公開しました
          </Button>
        </div>
      ) : null}
      <Modal className="w-80 h-44" open={memoDelete} onClick={handleDeleteModalClick}>
        <div className="h-8 text-center mt-6">
          <strong>メモを削除</strong>
        </div>
        <div className="ml-8 mt-2">
          <span>復元できませんがよろしいですか？</span>
        </div>
        <div className="flex flex-row mt-2">
          <Button button bgColor="gray" className="w-28" size="small" onClick={handleDeleteModalClick}>
            <strong>キャンセル</strong>
          </Button>
          <Button linkProps={{ href: "/" }} className="w-28" size="small" bgColor="red">
            <strong>削除する</strong>
          </Button>
        </div>
      </Modal>
      <Modal className="max-w-md" open={menuOpen} onClick={handleMenuClose} drawer>
        <div className="p-4">
          <header className="justify-items-end">
            <Button
              button
              className="hover:bg-gray-100 rounded-full"
              bgColor="gray"
              size="small"
              onClick={handleMenuClose}
            >
              <XIcon />
            </Button>
          </header>
          <main>
            {publicDisp ? (
              <Button
                button
                className="w-full"
                bgColor="gray"
                size="small"
                justifyCenter="justify-between"
                endIcon={<EyeOffIcon />}
                onClick={handlePublicClick}
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
                size="small"
                justifyCenter="justify-between"
                endIcon={<EyeIcon />}
                onClick={handlePublicClick}
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
              size="small"
              justifyCenter="justify-between"
              endIcon={<TrashIcon />}
              onClick={handleDeleteModalOpen}
            >
              <strong>
                <span className="my-auto text-red-500">削除する</span>
              </strong>
            </Button>
            <Button
              button
              className="w-full"
              bgColor="gray"
              size="small"
              justifyCenter="justify-between"
              disabled={!publicDisp}
              endIcon={<TwitterIcon disabled={!publicDisp} />}
            >
              <strong>
                <span className="my-auto">Twitterでシェアする</span>
              </strong>
            </Button>
            {publicDisp ? null : (
              <p className="text-center">
                <strong>以下は公開後に操作ができます</strong>
              </p>
            )}
            <Button
              button
              className="w-full"
              bgColor="gray"
              size="small"
              justifyCenter="justify-between"
              disabled={!publicDisp}
              endIcon={<TwitterIcon disabled={!publicDisp} />}
            >
              <strong>
                <span className="my-auto">画像化してシェアする</span>
              </strong>
            </Button>
            <Button
              button
              className="w-full"
              bgColor="gray"
              size="small"
              justifyCenter="justify-between"
              disabled={!publicDisp}
              endIcon={<ClipboardCopy disabled={!publicDisp} />}
            >
              <strong>
                <span className="my-auto">リンクをコピーする</span>
              </strong>
            </Button>
            <Button
              button
              className="w-full"
              bgColor="gray"
              size="small"
              justifyCenter="justify-between"
              disabled={!publicDisp}
              endIcon={<DotsCircleHorizontalIcon disabled={!publicDisp} />}
            >
              <strong>
                <span className="my-auto">その他オプション</span>
              </strong>
            </Button>
          </main>
        </div>
      </Modal>
    </div>
  );
};

export default Note;
