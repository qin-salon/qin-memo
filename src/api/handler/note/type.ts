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
  isMine: boolean;
  users: UserType;
};

export type NoteType = Omit<NoteSchema, "excerpt">;

export type ListNoteType = Omit<NoteSchema, "content" | "isMine" | "users">;

export const isNoteType = (data: any): data is NoteType => {
  return data.id !== undefined;
};
