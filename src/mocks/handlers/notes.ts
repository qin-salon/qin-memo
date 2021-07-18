import { rest } from "msw";
import { EXAMPLE_MY_NOTE_LIST, EXAMPLE_NOTE, EXAMPLE_OTHER_USER_NOTE_LIST } from "src/models/note";
import type { ListNoteType, NoteType } from "src/types/types";

export const notesHandlers = [
  // 新しいメモを作成する
  rest.post<string, { id: string }, never>("/notes", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }),

  // 特定のメモの情報を取得する
  rest.get<never, NoteType, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),

  // 特定のメモを更新する
  rest.put<string, NoteType, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    const body: Pick<NoteType, "content"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body.content);
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),

  // 特定のメモを削除する
  rest.delete<never, Pick<NoteType, "id">, { noteId: string }>("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: noteId }));
  }),

  // 特定のメモを公開する
  rest.patch<never, NoteType, { noteId: string }>("/notes/:noteId/public", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_NOTE, id: noteId, public: !EXAMPLE_NOTE.public })
    );
  }),

  // 自分または特定のユーザーのメモ一覧を取得する
  rest.get<never, ListNoteType[], { userId: string }>("/users/:userId/notes", (req, res, ctx) => {
    const { userId } = req.params;
    const notes = userId === "my" ? EXAMPLE_MY_NOTE_LIST : EXAMPLE_OTHER_USER_NOTE_LIST;
    return res(ctx.delay(1000), ctx.status(200), ctx.json(notes));
  }),

  // 自分または特定のユーザーのメモ一覧を検索して取得する
  rest.get<string, ListNoteType[], { userId: string; keyword: string }>(
    "/users/:userId/notes/search/:keyword",
    (req, res, ctx) => {
      const data =
        req.params.keyword.length > 2
          ? [EXAMPLE_OTHER_USER_NOTE_LIST[1]]
          : [EXAMPLE_OTHER_USER_NOTE_LIST[1], EXAMPLE_OTHER_USER_NOTE_LIST[2]];
      return res(ctx.delay(1000), ctx.status(200), ctx.json(data));
    }
  ),
];
