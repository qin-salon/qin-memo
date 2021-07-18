import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ConfirmDialog } from "src/components/ConfirmDialog";
import { MenuDialog } from "src/components/MenuDialog";
import { NoteMenu } from "src/components/NoteMenu";
import { Layout } from "src/components/shared/Layout";
import { withUser } from "src/domains/auth";
import { useNote } from "src/hooks/useNote";
import type { NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (props) => {
  const idToken = await props.AuthUser.getIdToken();
  const response = await fetch(`${API_URL}/v1/notes/${props.params?.noteId}`, {
    headers: { authorization: `Bearer ${idToken}` },
  });
  const data = await response.json();
  return { props: data };
});

const MemosNoteId: NextPage<NoteType> = (props) => {
  const authUser = useAuthUser();
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
  const handleChangeContent = useCallback(
    async (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.currentTarget.value);
      try {
        const idToken = await authUser.getIdToken();
        await fetch(`${API_URL}/v1/notes/${props.id}`, {
          method: "PUT",
          headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } catch (error) {
        console.error(error);
      }
    },
    [authUser, content, props.id]
  );

  return (
    <>
      <Layout left="memo" right={headerRight}>
        <div className="flex flex-col min-h-screen">
          <label htmlFor="memo" className="flex-1 pb-20 cursor-text">
            <TextareaAutosize
              id="memo"
              style={{ caretColor: "#3B82F6" }}
              className="w-full text-lg sm:text-xl bg-transparent border-none focus:ring-0 resize-none"
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

// TODO: 修正必要
export default withUser(MemosNoteId as any);
