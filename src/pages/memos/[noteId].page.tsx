import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { Button } from "src/components/Buttons";
import { Layout } from "src/components/Layout";
import { withUser } from "src/contexts/user";
import useSWR from "swr";

import { NoteAction } from "./NoteAction";
import { NoteEditor } from "./NoteEditor";
import { useNoteAction } from "./useNoteAction";
import { useNoteDialog } from "./useNoteDialog";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (props) => {
  const idToken = await props.AuthUser.getIdToken();
  const res = await fetch(`${API_URL}/notes/${props.params?.noteId}`, {
    headers: { authorization: `Bearer ${idToken}` },
  });
  const data = await res.json();
  return { props: data };
});

const MemosNoteId: NextPage<NoteType> = (props) => {
  const { data } = useSWR(`${API_URL}/notes/${props.id}`, { initialData: props });
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
