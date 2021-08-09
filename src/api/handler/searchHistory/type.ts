export type SearchHistoryType = {
  id: number;
  keyword: string;
  createdOn: string;
};

export const isSearchHistoryType = (data: any): data is SearchHistoryType => {
  return data.id !== undefined;
};
