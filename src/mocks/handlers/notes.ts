import { rest } from "msw";
import type { ListNote, Note } from "src/models/note";
import { EXAMPLE_MY_NOTE_LIST, EXAMPLE_NOTE, EXAMPLE_OTHER_USER_NOTE_LIST } from "src/models/note";
import type { SearchHistory } from "src/models/searchHistory";

export const notesHandlers = [
  // 新しいメモを作成する
  rest.post<string, { id: string }, never>("/notes", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }),

  // 特定のメモの情報を取得する
  rest.get<never, Note, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),

  // 特定のメモを更新する
  rest.put<string, Note, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    const body: Pick<Note, "content"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body.content);
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),

  // 特定のメモを削除する
  rest.delete<never, Pick<Note, "id">, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: noteId }));
  }),

  // 特定のメモを公開する
  rest.patch<never, Note, { noteId: string }>("/notes/:noteId/public", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_NOTE, id: noteId, public: !EXAMPLE_NOTE.public })
    );
  }),

  // 自分または特定のユーザーのメモ一覧を取得する
  rest.get<never, ListNote[], { userId: string }>("/users/:userId/notes", (req, res, ctx) => {
    const { userId } = req.params;
    const notes = userId === "my" ? EXAMPLE_MY_NOTE_LIST : EXAMPLE_OTHER_USER_NOTE_LIST;
    return res(ctx.delay(1000), ctx.status(200), ctx.json(notes));
  }),

  // 自分または特定のユーザーのメモ一覧を取得する
  rest.get<string, ListNote[], { userId: string }>("/users/:userId/notes/search", (req, res, ctx) => {
    const body: Pick<SearchHistory, "keyword"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body);
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json([EXAMPLE_OTHER_USER_NOTE_LIST[1], EXAMPLE_OTHER_USER_NOTE_LIST[2]])
    );
  }),
];
