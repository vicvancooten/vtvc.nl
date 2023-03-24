export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export const fetchUrl = async (
  url: string,
  headers?: { [key: string]: string }
) => await (await fetch(url, { headers })).json()
