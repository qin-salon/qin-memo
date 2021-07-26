import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "src/components/shared/Buttons";
import { Layout } from "src/components/shared/Layout";
import { NoteAction } from "src/components/shared/NoteAction";
import { useUser, withUser } from "src/contexts/user";
import type { ListNoteType, NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";
import useSWR, { mutate as mutateUsersNotes } from "swr";

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
  const { user } = useUser();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [content, setContent] = useState(props.content);
  const { data, mutate } = useSWR(`${API_URL}/v1/notes/${props.id}`, { initialData: props });

  const handleOpenMenu = useCallback(() => {
    setIsShowMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsShowMenu(false);
  }, []);

  const togglePublicStatus = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/notes/${props.id}/public`, {
      method: "patch",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await mutate();
    mutateUsersNotes(
      `${API_URL}/v1/users/${user?.id}/notes`,
      (notes: ListNoteType[]) => {
        if (!notes) return;
        const target = notes.filter((note) => {
          return note.id === props.id;
        })[0];
        const others = notes.filter((note) => {
          return note.id !== props.id;
        });
        return [{ ...target, public: !target.public }, ...others];
      },
      false
    );
  }, [authUser, mutate, props.id, user?.id]);

  const deleteNote = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/v1/notes/${props.id}`, {
      method: "delete",
      headers: { authorization: `Bearer ${idToken}` },
    });
    mutateUsersNotes(
      `${API_URL}/v1/users/${user?.id}/notes`,
      (notes: ListNoteType[]) => {
        if (!notes) return;
        return notes.filter((note) => {
          return note.id !== props.id;
        });
      },
      false
    );
  }, [authUser, props.id, user?.id]);

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
        <div className="flex flex-col h-[calc(100vh-168px)] sm:h-[calc(100vh-192px)]">
          <label htmlFor="memo" className="flex-1 cursor-text">
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

      <NoteAction
        public={data?.public}
        isShowMenu={isShowMenu}
        onCloseMenu={handleCloseMenu}
        togglePublicStatus={togglePublicStatus}
        deleteNote={deleteNote}
      />
    </>
  );
};

// TODO: 修正必要
export default withUser(MemosNoteId as any);
