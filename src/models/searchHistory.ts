export type SearchHistory = {
  id: number;
  keyword: string;
};

export const EXAMPLE_SEARCH_HISTORIES: SearchHistory[] = [
  { id: 3, keyword: "Vue.js" },
  { id: 2, keyword: "React" },
  { id: 1, keyword: "JavaScript" },
];
