import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { isNoteType } from "src/api/handler/note/type";
import { withUser } from "src/util/user";
import { SWRConfig } from "swr";

import { NoteEditor } from "./NoteEditor";
import { NoteViewer } from "./NoteViewer";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async (props) => {
  try {
    const idToken = await props.AuthUser.getIdToken();
    const NOTE_API_URL = `${API_URL}/notes/${props.params?.noteId}`;
    const res = await fetch(NOTE_API_URL, {
      headers: { authorization: `Bearer ${idToken}` },
    });
    const note = await res.json();
    if (!isNoteType(note)) {
      throw new Error("No note");
    }
    return {
      props: {
        note,
        fallback: { [NOTE_API_URL]: note },
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
});

const MemoNoteId: NextPage<{ fallback: Record<string, any>; note: NoteType }> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      {props.note.isMine ? <NoteEditor note={props.note} /> : <NoteViewer note={props.note} />}
    </SWRConfig>
  );
};

export default withUser(MemoNoteId, {});
