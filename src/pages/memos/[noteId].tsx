import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ConfirmDialog } from "src/components/ConfirmDialog";
import { MenuDialog } from "src/components/MenuDialog";
import { NoteMenu } from "src/components/NoteMenu";
import { Layout } from "src/components/shared/Layout";
import { useNote } from "src/hooks/useNote";
import { EXAMPLE_NOTE } from "src/models/note";
import type { NoteType } from "src/types/types";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<NoteType, { noteId: string }> = async ({ params: _ }) => {
  // const res = await fetch(`/notes/${params?.noteId}`);
  // const data: NoteType = await res.json();
  return { props: EXAMPLE_NOTE, revalidate: 60 };
};

const MemosNoteId: NextPage<NoteType> = (props) => {
  const {
    headerRight,
    menu,
    isShowMenu,
    handleCloseMenu,
    handleDeleteMemo,
    isShowDeleteNoteDialog,
    handleCloseDeleteNoteDialog,
  } = useNote(props);
  const [content, setContent] = useState(props.content);
  const handleChangeContent = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  }, []);

  return (
    <>
      <Layout left="memo" right={headerRight}>
        <div className="flex flex-col min-h-screen">
          <label htmlFor="memo" className="flex-1 pb-20 cursor-text">
            <TextareaAutosize
              id="memo"
              style={{ caretColor: "#3B82F6" }}
              className="w-full text-lg sm:text-xl outline-none resize-none"
              value={content}
              onChange={handleChangeContent}
              placeholder="メモを入力する"
              autoComplete="off"
            />
          </label>
        </div>
      </Layout>

      <MenuDialog show={isShowMenu} onClose={handleCloseMenu}>
        <NoteMenu menu={menu} />
      </MenuDialog>

      <ConfirmDialog
        show={isShowDeleteNoteDialog}
        onClose={handleCloseDeleteNoteDialog}
        onClickOk={handleDeleteMemo}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </>
  );
};

export default MemosNoteId;