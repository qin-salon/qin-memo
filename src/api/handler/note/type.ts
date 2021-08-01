type NoteCommonType = {
  id: string;
  public: boolean;
  updatedOn: string;
};

export type NoteType = NoteCommonType & { content: string };

export type ListNoteType = NoteCommonType & { excerpt: string };

export const isNoteType = (data: any): data is NoteType => {
  return data.id !== undefined;
};
