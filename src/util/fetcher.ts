export const fetcher = async (url: string, token?: string | null) => {
  const res = await fetch(url, token ? { headers: { authorization: `Bearer ${token}` } } : undefined);
  const json = await res.json();
  return json;
};
