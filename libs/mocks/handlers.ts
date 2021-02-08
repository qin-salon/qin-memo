import { rest } from "msw";

const ORIGIN = "https://demo.qin";
const random = (num?: number) => {
  return Math.floor(Math.random() * (num ?? 2000));
};

export type User = {
  id: string;
  name: string;
  profileImage: string;
};

export type Post = {
  id: string;
  public: boolean;
  text: string;
};

export type ListedPost = {
  id: string;
  public: boolean;
  excerpt: string;
};

export type SearchHistory = {
  id: string;
  keyword: string;
};

export const handlers = [
  // rest.get(`${ORIGIN}/login`, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.delay(random()));
  // }),
  // rest.get(`${ORIGIN}/me`, (req, res, ctx) => {
  //   const isAuthenticated = true;
  //   if (!isAuthenticated) {
  //     return res(ctx.status(403), ctx.json({ errorMessage: "Not authorized" }));
  //   }
  //   return res(
  //     ctx.status(200),
  //     ctx.delay(random()),
  //     ctx.json<User>({ id: "fjdajfiasj", name: "ゲームボーイ", profileImage: "/img/dummy/user1.png" })
  //   );
  // }),
  rest.get<any, any, { userId: string }>(`${ORIGIN}/users/:userId`, (req, res, ctx) => {
    const { userId } = req.params;
    return res(
      ctx.status(200),
      ctx.delay(random()),
      ctx.json<User>({ id: `demo_${userId}`, name: "イカちゃん", profileImage: "/img/dummy/user2.png" })
    );
  }),

  rest.get<any, any, { userId: string }>(`${ORIGIN}/users/:userId/searchHistories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(random()),
      ctx.json<SearchHistory[]>([
        { id: `fdasjfdsa`, keyword: "react" },
        { id: `iofdogkkd`, keyword: "vue" },
      ])
    );
  }),

  rest.get<any, any, { userId: string }>(`${ORIGIN}/users/:userId/notes`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(random()),
      ctx.json<ListedPost[]>([
        {
          id: "fdjaifdaff",
          public: true,
          excerpt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        {
          id: "kfokdofkdo",
          public: true,
          excerpt: "sapiente eum soluta cumque molestiae sed rem inventore!",
        },
        {
          id: "iofdskofka",
          public: true,
          excerpt: "culpa incidunt, non explicabo totam quo, quaerat sit eos reprehenderit.",
        },
        {
          id: "fkdfkkfffa",
          public: true,
          excerpt: "magni nihil quia nam. Veniam ab dignissimos explicabo error fuga, odit, fugit beatae ipsam.",
        },
        {
          id: "fkkfodaofk",
          public: true,
          excerpt: "Odio quod ratione debitis, quia necessitatibus molestiae corrupti aliquid saepe.",
        },
      ])
    );
  }),

  rest.get(`${ORIGIN}/notes`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(random()),
      ctx.json<ListedPost[]>([
        {
          id: "fdjaifdaff",
          public: true,
          excerpt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        {
          id: "kfokdofkdo",
          public: true,
          excerpt: "sapiente eum soluta cumque molestiae sed rem inventore!",
        },
        {
          id: "iofdskofka",
          public: true,
          excerpt: "culpa incidunt, non explicabo totam quo, quaerat sit eos reprehenderit.",
        },
        {
          id: "fkdfkkfffa",
          public: true,
          excerpt: "magni nihil quia nam. Veniam ab dignissimos explicabo error fuga, odit, fugit beatae ipsam.",
        },
        {
          id: "fkkfodaofk",
          public: true,
          excerpt: "Odio quod ratione debitis, quia necessitatibus molestiae corrupti aliquid saepe.",
        },
      ])
    );
  }),

  rest.get(`${ORIGIN}/notes/:noteId`, (req, res, ctx) => {
    const { noteId } = req.params;
    return res(
      ctx.status(200),
      ctx.delay(random()),
      ctx.json<Post>({
        id: `demo_${noteId}`,
        public: true,
        text:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate corporis cumque fugit perferendis eligendi possimus optio veritatis accusamus asperiores tempora beatae officiis, praesentium saepe neque architecto facilis corrupti ipsa sed.",
      })
    );
  }),
];
