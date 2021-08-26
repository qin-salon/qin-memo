import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { withUser } from "src/context/user";
import { fetcher } from "src/util/fetcher";

import { NoteEditor } from "./NoteEditor";
import { NoteViewer } from "./NoteViewer";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async (props) => {
  try {
    const idToken = await props.AuthUser.getIdToken();
    const note = await fetcher(`${API_URL}/notes/${props.params?.noteId}`, idToken);
    if (!note) {
      throw new Error(`Note is not found`);
    }
    return { props: { note } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
});

const MemoNoteId: NextPage<{ note: NoteType }> = (props) => {
  return props.note.isMine ? <NoteEditor {...props} /> : <NoteViewer {...props} />;
};

export default withUser(MemoNoteId, {});
