import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import type { NoteType } from "src/api/handler/note/type";
import { NoteEditor } from "src/components/NoteEditor";
import { Button } from "src/components/shared/Buttons";
import { Layout } from "src/components/shared/Layout";
import { NoteAction } from "src/components/shared/NoteAction";
import { useNoteAction, useNoteDialog } from "src/contexts/note";
import { withUser } from "src/contexts/user";
import { API_URL } from "src/utils/constants";
import useSWR from "swr";

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
  const { data } = useSWR(`${API_URL}/v1/notes/${props.id}`, { initialData: props });
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteDialog();
  const noteAction = useNoteAction(data ?? props);

  return (
    <>
      <Layout
        left="memo"
        right={[
          data?.public ? (
            <span key="public" className="py-1 px-2.5 text-xs font-bold text-white bg-orange-400 rounded-full">
              公開中
            </span>
          ) : undefined,
          <Button key="menu" variant="ghost" className="w-10 h-10" onClick={handleOpenMenu}>
            <DotsCircleHorizontalIcon className="w-5 h-5" />
          </Button>,
        ]}
      >
        <NoteEditor {...props} />
      </Layout>

      <NoteAction public={data?.public} isShowMenu={isShowMenu} onCloseMenu={handleCloseMenu} {...noteAction} />
    </>
  );
};

export default withUser(MemosNoteId);
