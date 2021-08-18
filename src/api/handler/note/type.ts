/**
 * @package
 */
export type NoteSchema = {
  id: string;
  public: boolean;
  updatedAt: string;
  content: string;
  excerpt: string;
};

export type NoteType = Omit<NoteSchema, "excerpt">;

export type ListNoteType = Omit<NoteSchema, "content">;

export const isNoteType = (data: any): data is NoteType => {
  return data.id !== undefined;
};
