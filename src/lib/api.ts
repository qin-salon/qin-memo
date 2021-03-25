export const userUrl = "/users";

// 検索
export const getApi = (url: string) => {
  fetch(url).then((res) => {
    return res.json();
  });
};
