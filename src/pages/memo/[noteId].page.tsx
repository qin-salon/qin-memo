import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { withUser } from "src/context/user";
import { fetcher } from "src/util/fetcher";

import { NoteEditor } from "./NoteEditor";
import { NoteViewer } from "./NoteViewer";

type ErrorResponse = { statusCode: number; error: string; message: string };

const hasError = (res: any | ErrorResponse): res is ErrorResponse => {
  return "error" in res;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async (props) => {
  try {
    const idToken = await props.AuthUser.getIdToken();
    const note: NoteType | undefined = await fetcher(`${API_URL}/notes/${props.params?.noteId}`, idToken);
    if (hasError(note)) throw new Error(note.message);
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
