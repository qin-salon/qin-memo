export type UserType = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type UserPutRequest = UserType | Pick<UserType, "id" | "name"> | Pick<UserType, "id" | "avatarUrl">;

export type NoteType = {
  id: string;
  content: string;
  public: boolean;
};

export type NotePostRequest = Pick<NoteType, "content" | "public">;

export type NotePutRequest =
  | NoteType
  | Pick<NoteType, "id" | "content">
  | Pick<NoteType, "id" | "public">
  | Pick<NoteType, "id" | "content" | "public">;

export type ListNoteType = {
  id: string;
  excerpt: string;
  public: boolean;
  updatedOn: string;
};

export type SearchHistoryType = {
  id: number;
  keyword: string;
};
