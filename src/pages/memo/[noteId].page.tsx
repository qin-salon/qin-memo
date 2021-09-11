import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { BlogJsonLd, NextSeo } from "next-seo";
import { useMemo } from "react";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { isNoteType } from "src/api/handler/note/type";
import { getFirstAndSecondLine } from "src/util/string";
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
    const res = await fetch(NOTE_API_URL, { headers: { authorization: `Bearer ${idToken}` } });
    const note = await res.json();
    if (!isNoteType(note)) {
      throw new Error("No note");
    }
    return {
      props: { note, fallback: { [NOTE_API_URL]: note } },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
});

type MemoNoteIdProps = { fallback: Record<string, any>; note: NoteType };

const MemoNoteId: NextPage<MemoNoteIdProps> = (props) => {
  const { title, description, url } = useMemo(() => {
    const [first, second] = getFirstAndSecondLine(props.note.content);
    const origin = process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000";
    return {
      url: `${origin}/notes/${props.note.id}`,
      title: first,
      description: `${first}. ${second}`,
    };
  }, [props.note]);

  return (
    <>
      {props.note.isPublic ? (
        <>
          <NextSeo
            title={title}
            description={description}
            openGraph={{
              url,
              description,
              images: [{ url: props.note.users.avatarUrl, alt: props.note.users.accountName }],
            }}
          />
          <BlogJsonLd
            url={url}
            title={title}
            description={description}
            images={[props.note.users.avatarUrl]}
            datePublished={props.note.updatedAt}
            dateModified={props.note.updatedAt}
            authorName={props.note.users.accountName}
          />
        </>
      ) : null}

      <SWRConfig value={{ fallback: props.fallback }}>
        {props.note.isMine ? <NoteEditor note={props.note} /> : <NoteViewer note={props.note} />}
      </SWRConfig>
    </>
  );
};

export default withUser(MemoNoteId, {});
