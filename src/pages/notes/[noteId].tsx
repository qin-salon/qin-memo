import { CheckCircleIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { TextareaHTMLAttributes } from "react";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ConfirmDelete } from "src/components/ConfirmDelete";
import { MemoMenu } from "src/components/MemoMenu";
import { Button } from "src/components/shared/Button";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { NotePutRequest, NoteType } from "src/types/types";
import useSWR from "swr";

// **********************************
// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const Note: NextPage = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [publicFlg, setPublicFlg] = useState(false);
  const [publicOpen, setPublicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [memoDelete, setMemoDelete] = useState(false);

  const { data, error, mutate } = useSWR<NoteType>(`/notes/${router.query.noteId}`, {
    initialData: { id: "0", content: "", public: false },
  });

  useEffect(() => {
    setContent(data?.content ?? "");
    setPublicFlg(data?.public ?? false);
  }, [data?.content, data?.public]);

  if (error && router.query.noteId !== "new") {
    // TODO: 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // TODO: 検索結果取得時のローディング処理
    return null;
  }

  // ===================================
  // 入力値の保存
  const handleContentChange: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (event) => {
    setContent(event.currentTarget.value);
  };
  // ===================================
  // メモ公開後のボタンクローズ
  const handlePublicClose = () => {
    setPublicOpen(!publicOpen);
  };
  // ===================================
  // メニューオープン
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  // ===================================
  // メニュークローズ
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  // ===================================
  // 削除確認画面閉じる
  const handleDeleteModalClose = () => {
    setMemoDelete(false);
  };
  // ===================================
  // 削除確認画面起動
  const handleDeleteModalOpen = () => {
    setMemoDelete(true);
    setMenuOpen(false);
  };
  // ===================================
  // 公開する・しないの切替
  const handlePublicClick = async () => {
    const req: NotePutRequest = { id: data.id, public: !publicFlg };
    // 更新
    await fetch(`/notes/${data.id}/public`, {
      method: "patch",
      body: JSON.stringify(req),
    });
    await mutate();
    if (!publicFlg) {
      setPublicOpen(true);
    }
    setPublicFlg(!publicFlg);
    setMenuOpen(false);
  };
  // ===================================
  // メモ更新
  // const handleContentSave = async () => {
  //   if (data?.id === "0") {
  //     // 登録処理
  //     const req: NotePostRequest = { content: content, public: false };
  //     await fetch("/notes", {
  //       method: "post",
  //       body: JSON.stringify(req),
  //     });
  //   } else {
  //     // 更新処理
  //     if (data) {
  //       const req: NotePutRequest = { id: data.id, content: content };
  //       await fetch(`/notes/${data.id}`, {
  //         method: "put",
  //         body: JSON.stringify(req),
  //       });
  //     }
  //   }
  //   await mutate();
  //   await router.push(`/users/${user.id}`);
  // };

  // ===================================
  // メモ削除
  const handleMemoDeleteClick = async () => {
    await fetch(`/notes/${data.id}`, {
      method: "delete",
    });
    await mutate();
    await router.push(`/users/${user.id}`);
  };

  return (
    <>
      <Layout
        left="memo"
        right={[
          <span key="public" className="text-xs font-bold py-1 px-2.5 text-white bg-orange-400 rounded-full">
            公開中
          </span>,
          <button key="menu" className="grid place-items-center w-9 h-9" onClick={handleMenuOpen}>
            <DotsCircleHorizontalIcon className="w-5 h-5" />
          </button>,
          "profile",
        ]}
      >
        <div className="flex flex-col min-h-screen">
          <label htmlFor="memo" className="flex-1 pb-20 cursor-text">
            <TextareaAutosize
              id="memo"
              style={{ caretColor: "#3B82F6" }}
              className="w-full text-lg outline-none resize-none sm:text-2xl"
              value={content}
              onChange={handleContentChange}
              placeholder="メモを入力する"
            />
          </label>

          {publicOpen ? (
            <div className="z-50 absolute left-1/2 transform -translate-x-1/2">
              <Button button startIcon={<CheckCircleIcon className="w-5 h-5" />} onClick={handlePublicClose}>
                メモを公開しました
              </Button>
            </div>
          ) : null}
        </div>
      </Layout>

      <ConfirmDelete
        memoDelete={memoDelete}
        onDeleteModalClose={handleDeleteModalClose}
        onMemoDeleteClick={handleMemoDeleteClick}
      />
      <MemoMenu
        onDeleteModalOpen={handleDeleteModalOpen}
        menuOpen={menuOpen}
        onMenuClose={handleMenuClose}
        publicFlg={publicFlg}
        onPublicClick={handlePublicClick}
      />
    </>
  );
};

export default Note;
