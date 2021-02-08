import type { ListedPost, User } from "libs/mocks/handlers";
import type { GetStaticProps } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { Layout } from "src/components/layout";
import useSWR from "swr";

export const getStaticProps: GetStaticProps<{ posts: ListedPost[] }> = async () => {
  const res = await fetch("https://demo.qin/notes");
  const posts = await res.json();
  return { props: { posts } };
};

const MockTest: VFC<{ posts: ListedPost[] }> = (props) => {
  const { data: posts, error: postsError } = useSWR<ListedPost[]>("https://demo.qin/notes", {
    initialData: props.posts,
  });
  const { data: user, error: userError } = useSWR<User>(`https://demo.qin/users/${"foo"}`);
  if (postsError || userError) return <div>failed to load</div>;

  return (
    <Layout>
      <Head>
        <title>MockTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-2">
        <div>
          <h1>{user?.name ?? "...Loading"}</h1>
          <img src={user?.profileImage} alt={user?.name} width={200} height={200} />
        </div>

        <ul className="mt-4 grid gap-2">
          {posts ? (
            posts.map((post) => {
              return (
                <li key={post.id}>
                  <p>{post.excerpt}</p>
                </li>
              );
            })
          ) : (
            <div>...loading</div>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default MockTest;
