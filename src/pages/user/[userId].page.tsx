import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { API_URL } from "src/api/endpoint";
import type { ListNoteType } from "src/api/handler/note/type";
import type { UserType } from "src/api/handler/user/type";
import { Avatar } from "src/component/Avatar";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { Layout } from "src/layout";
import { withUser } from "src/util/user";

type Props = { user: UserType; note: ListNoteType[] };

type ErrorResponse = { statusCode: number; error: string; message: string };

const hasError = (res: any | ErrorResponse): res is ErrorResponse => {
  return "error" in res;
};

const fetchJson = async <T extends unknown>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(input, init);
  const data = await res.json();
  return data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, { userId: string }> = async (ctx) => {
  try {
    const [user, note] = await Promise.all([
      fetchJson<UserType | ErrorResponse>(`${API_URL}/users/${ctx.params?.userId}`),
      fetchJson<ListNoteType[] | ErrorResponse>(`${API_URL}/users/${ctx.params?.userId}/notes`),
    ]);
    if (hasError(user)) throw new Error(user.message);
    if (hasError(note)) throw new Error(note.message);
    return { props: { user, note }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
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
