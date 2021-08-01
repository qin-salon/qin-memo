import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NoteList } from "src/components/NoteList";
import { NoteWriteButton } from "src/components/NoteWriteButton";
import { Avatar } from "src/components/shared/Avatar";
import { Layout } from "src/components/shared/Layout";
import { withUser } from "src/contexts/user";
import type { ListNoteType, UserType } from "src/types/types";
import { API_URL } from "src/utils/constants";

type Props = { user: UserType; note: ListNoteType[] };

const getJson = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, { userId: string }> = async (ctx) => {
  const [user, note] = await Promise.all<UserType, ListNoteType[]>([
    getJson(`${API_URL}/v1/users/${ctx.params?.userId}`),
    getJson(`${API_URL}/v1/users/${ctx.params?.userId}/notes`),
  ]);

  if (!user.id) {
    return { notFound: true };
  }

  return { props: { user, note }, revalidate: 10 };
};

const UsersUserId: NextPage<Props> = (props) => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="note" />, "profile"]}>
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar
            src={props.user.avatarUrl}
            alt={props.user.name}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">{props.user.name}</span>
          </div>
        </div>

        <NoteList data={props.note} />
      </div>
    </Layout>
  );
};

export default withUser(UsersUserId);
