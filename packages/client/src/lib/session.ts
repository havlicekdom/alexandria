import "server-only";
import { cookies } from "next/headers";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getRedirectedFrom() {
  const cookieStore = await cookies();
  const redirectedFrom = cookieStore.get("redirectedFrom")?.value || "/overview";

  cookieStore.delete("redirectedFrom");

  return redirectedFrom;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
