import type { UserType } from "src/api/handler/user/type";

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

export type NoteWithUserType = NoteType & {
  users: Omit<UserType, "enabledQinMemo">;
};

export type ListNoteType = Omit<NoteSchema, "content">;

export const isNoteType = (data: any): data is NoteType => {
  return data.id !== undefined;
};
