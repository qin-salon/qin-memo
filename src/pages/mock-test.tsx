import type { GetStaticProps } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { Layout } from "src/components/layout";
import useSWR from "swr";

type Post = { id: string; body: string };
type User = { id: string; name: string; img: string };

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch("https://demo.qin/posts");
  const posts = await res.json();
  return { props: { posts } };
};

const MockTest: VFC<{ posts: Post[] }> = (props) => {
  const { data: posts, error: postsError } = useSWR<Post[]>("https://demo.qin/posts", {
    initialData: props.posts,
  });
  const { data: user, error: userError } = useSWR<User>("https://demo.qin/user");
  if (postsError || userError) return <div>failed to load</div>;

  return (
    <Layout>
      <Head>
        <title>MockTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <div>
          <h1>{user.name}</h1>
          <img src={user.img} alt={user.name} />
        </div>
      ) : (
        <div>...loading</div>
      )}

      {posts ? (
        <ul className="p-8 grid gap-8">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <p>{post.body}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>...loading</div>
      )}
    </Layout>
  );
};

export default MockTest;
