import { getToken } from "utils/getToken";

export async function fetchApi<T>(
  url: string,
  method: string,
  payload?: FormData
): Promise<T> {
  const token = await getToken();
  const request = new Request(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: payload && JSON.stringify(Object.fromEntries(payload)),
  });
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const string = await response.text();
  const json = string === "" ? {} : JSON.parse(string);
  return json;
}
