import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import { useMemo } from "react";
import { API_URL } from "src/api/endpoint";
import type { NoteWithUserType } from "src/api/handler/note/type";
import type { UserType } from "src/api/handler/user/type";
import { Button } from "src/component/Button";
import { Layout } from "src/layout";
import { fetcher } from "src/util/fetcher";
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
  const [note, user] = await Promise.all<NoteWithUserType, UserType>([
    fetcher(`${API_URL}/notes/${props.params?.noteId}`, idToken),
    fetcher(`${API_URL}/users`, idToken),
  ]);
  return { props: { note, isEditable: user.id === note.users.id } };
});

type Props = {
  note: NoteWithUserType;
  isEditable: boolean;
};

const MemoNoteId: NextPage<Props> = (props) => {
  const authUser = useAuthUser();
  const { data } = useSWR<NoteWithUserType>(`${API_URL}/notes/${props.note.id}`, {
    fetcher: async (url) => {
      const idToken = await authUser.getIdToken();
      return fetcher(url, idToken);
    },
    initialData: props.note,
  });
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteDialog();
  const note = useMemo(() => {
    return data ?? props.note;
  }, [data, props.note]);
  const noteAction = useNoteAction(note);

  return (
    <>
      <Layout
        left="memo"
        right={[
          note.public ? (
            <span key="public" className="py-1 px-2.5 text-xs font-bold text-white bg-orange-400 rounded-full">
              公開中
            </span>
          ) : undefined,
          props.isEditable ? (
            <Button key="menu" variant="ghost" className="w-10 h-10" onClick={handleOpenMenu}>
              <DotsCircleHorizontalIcon className="w-5 h-5" />
            </Button>
          ) : undefined,
        ]}
      >
        {props.isEditable ? <NoteEditor {...note} /> : <NoteViewer {...note} />}
      </Layout>

      <NoteAction public={data?.public} isShowMenu={isShowMenu} onCloseMenu={handleCloseMenu} {...noteAction} />
    </>
  );
};

export default withAuthUser<Props>()(MemoNoteId);
