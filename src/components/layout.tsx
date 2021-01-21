import type { ReactNode } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-red-100 dark:bg-gray-800 dark:text-white">{props.children}</main>
      <Footer />
    </>
  );
};
