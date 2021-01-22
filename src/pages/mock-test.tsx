import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { VFC } from "react";
import { useState } from "react";
import { Layout } from "src/components/layout";

type Book = {
  title: string;
  description: string;
};

type Review = {
  id: string;
  text: string;
  author: string;
};

export const getServerSideProps: GetServerSideProps<{ book: Book }> = async () => {
  const res = await fetch("https://my.backend/book");
  const book = await res.json();
  return { props: { book } };
};

const MockTest: VFC<{ book: Book }> = (props) => {
  const [reviews, setReviews] = useState<Review[]>();

  const handleGetReviews = async () => {
    const res = await fetch("/reviews");
    const reviews = await res.json();
    setReviews(reviews);
  };

  return (
    <Layout>
      <Head>
        <title>MockTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{props.book.title}</h1>
      <p>{props.book.description}</p>
      <button onClick={handleGetReviews}>Load reviews</button>

      {reviews ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <p>{review.text}</p>
                <p>{review.author}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </Layout>
  );
};

export default MockTest;
