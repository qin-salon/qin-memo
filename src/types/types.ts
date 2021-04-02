export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};
export type Note = {
  id: string;
  content: string;
  public: boolean;
  date: string;
};

export type ListNote = {
  id: string;
  excerpt: string;
  public: boolean;
  date: string;
};
