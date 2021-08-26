import { NoteWriteButton } from "src/component/Note";
import { withUser } from "src/context/user";
import { Layout } from "src/layout";

const Custom404 = () => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="write" />, "profile"]}>
      <div className="flex flex-col gap-6 items-center">
        <div className="mt-10 text-7xl font-bold sm:mt-40 sm:text-9xl">404</div>
        <div className="text-2xl font-bold sm:text-3xl">お探しのページが見つかりませんでした</div>
      </div>
    </Layout>
  );
};

export default withUser(Custom404, {});
