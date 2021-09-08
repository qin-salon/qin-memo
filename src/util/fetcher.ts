export const fetcher = async (key: string, token?: string | null) => {
  const res = await fetch(key, token ? { headers: { authorization: `Bearer ${token}` } } : undefined);
  const json = await res.json();
  return json;
};
