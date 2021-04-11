import type { NextPage } from "next";
import { useRouter } from "next/router";
import Router from "next/router";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CheckCircle } from "src/components/icon/CheckCircle";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { DotsCircleHorizontalIcon } from "src/components/icon/DotsCircleHorizontalIcon";
import { MemoMenu } from "src/components/MemoMenu";
import { Button } from "src/components/shared/Button";
import type { NotePostRequest, NotePutRequest, NoteType } from "src/types/types";
import useSWR from "swr";

const InitialData: NoteType = {
  id: "0",
  content: "",
  public: false,
};

const Note: NextPage = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [publicDisp, setPublicDisp] = useState(false);
  const [publicOpen, setPublicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [memoDelete, setMemoDelete] = useState(false);

  const { data, error, mutate } = useSWR<NoteType>(`/notes/${router.query.noteId}`, {
    initialData: InitialData,
  });

  useEffect(() => {
    // textareaのvalueに渡す
    setContent(data?.content || "");
  }, [data?.content]);

  if (error) {
    // TODO: 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // TODO: 検索結果取得時のローディング処理
    return null;
  }

  // ===================================
  // 入力値の保存
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
  const handlePublicClick = () => {
    const feachUpdate = async () => {
      const req: NotePutRequest = { id: data.id, public: !publicDisp };
      // 更新
      const res = await fetch(`/notes/${router.query.noteId}/public`, {
        method: "put",
        body: JSON.stringify(req),
      });
      await res.json();
      await mutate;
    };
    feachUpdate;
    if (!publicDisp) {
      setPublicOpen(true);
    }
    setPublicDisp(!publicDisp);
    setMenuOpen(false);
  };
  // ===================================
  // メモ更新
  const handleContentSave = () => {
    const feachUpdate = async () => {
      if (data?.id === "0") {
        // 登録処理
        const req: NotePostRequest = { content: content, public: false };
        await fetch("/notes", {
          method: "post",
          body: JSON.stringify(req),
        });
      } else {
        // 更新処理
        if (data) {
          const req: NotePutRequest = { id: data.id, content: content };
          await fetch(`/notes/${router.query.noteId}`, {
            method: "put",
            body: JSON.stringify(req),
          });
        }
      }
      await mutate;
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
          {data?.public ? (
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
      <MemoMenu
        memoDelete={memoDelete}
        onDeleteModalClose={handleDeleteModalClose}
        onDeleteModalOpen={handleDeleteModalOpen}
        menuOpen={menuOpen}
        onMenuClose={handleMenuClose}
        publicDisp={publicDisp}
        onPublicClick={handlePublicClick}
      />
    </div>
  );
};

export default Note;
