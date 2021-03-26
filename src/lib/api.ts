export const userUrl = "/users";

// Tはレスポンスのjsonの型を指定する
const wrap = <T>(note: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    note
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => {
              // jsonが取得できた場合だけresolve
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// fetchに型定義を指定できる。
export const fetcher = <T = any>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return wrap<T>(fetch(input, init));
};
