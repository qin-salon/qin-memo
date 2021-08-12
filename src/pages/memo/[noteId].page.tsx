import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { Button } from "src/component/Button";
import { Layout } from "src/layout";
import useSWR from "swr";

import { NoteAction } from "./NoteAction";
import { NoteEditor } from "./NoteEditor";
import { NoteViewer } from "./NoteViewer";
import { useNoteAction } from "./useNoteAction";
import { useNoteDialog } from "./useNoteDialog";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async (props) => {
  const idToken = await props.AuthUser.getIdToken();
  const res = await fetch(`${API_URL}/notes/${props.params?.noteId}`, {
    headers: { authorization: `Bearer ${idToken}` },
  });
  const data = await res.json();
  //TODO
  return { props: { ...data, isEditable: false } };
});

const MemosNoteId: NextPage<NoteType & { isEditable: boolean }> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { isEditable, ...initialData } = props;
  const { data } = useSWR(`${API_URL}/notes/${initialData.id}`, { initialData }) as { data: NoteType }; // TODO;
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteDialog();
  const noteAction = useNoteAction(data ?? initialData);

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
          isEditable ? (
            <Button key="menu" variant="ghost" className="w-10 h-10" onClick={handleOpenMenu}>
              <DotsCircleHorizontalIcon className="w-5 h-5" />
            </Button>
          ) : undefined,
        ]}
      >
        {isEditable ? <NoteEditor {...data} /> : <NoteViewer {...data} />}
      </Layout>

      <NoteAction public={data?.public} isShowMenu={isShowMenu} onCloseMenu={handleCloseMenu} {...noteAction} />
    </>
  );
};

export default MemosNoteId;
