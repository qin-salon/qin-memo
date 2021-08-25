import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType } from "src/api/handler/note/type";
import type { UserType } from "src/api/handler/user/type";
import { Avatar } from "src/component/Avatar";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { withUser } from "src/context/user";
import { Layout } from "src/layout";
import { fetcher } from "src/util/fetcher";

type Props = { user: UserType; note: ListNoteType[] };

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, { userId: string }> = async (ctx) => {
  const [user, note] = await Promise.all<UserType, ListNoteType[]>([
    fetcher(`${API_URL}/users/${ctx.params?.userId}`),
    fetcher(`${API_URL}/users/${ctx.params?.userId}/notes`),
  ]);
  if (!user) return { notFound: true };
  return { props: { user, note }, revalidate: 10 };
};

const UserUserId: NextPage<Props> = (props) => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="note" />, "profile"]}>
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar
            src={props.user.avatarUrl}
            alt={props.user.accountName}
            width={64}
            height={64}
            className="overflow-hidden w-16 h-16 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">{props.user.accountName}</span>
          </div>
        </div>

        <NoteList data={props.note} />
      </div>
    </Layout>
  );
};

export default withUser(UserUserId, {});
