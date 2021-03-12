import { rest } from "msw";
import { EXAMPLE_NOTE, EXAMPLE_NOTE_LIST } from "src/models/note";

export const notesHandlers = [
  rest.post("/notes", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_NOTE_LIST));
  }),
  rest.get("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),
  rest.put("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
  }),
  rest.delete("/notes/:noteId", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: noteId }));
  }),
  rest.patch("/notes/:noteId/public", (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId, public: true }));
  }),
];
