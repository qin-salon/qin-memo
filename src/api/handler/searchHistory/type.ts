export type SearchHistoryType = {
  id: number;
  keyword: string;
  createdAt: string;
};

export const isSearchHistoryType = (data: any): data is SearchHistoryType => {
  return data.id !== undefined;
};
