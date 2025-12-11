'use server';

import { createSession, deleteSession, getRedirectedFrom } from "lib/session";
import { redirect } from "next/navigation";
import API from 'constants/api';
import { fetchApi } from "utils/fetch";

export async function login(state: void, payload: FormData) {
  const data = await fetchApi(API.login, 'POST', payload);

  await createSession(data.access_token);
  redirect(await getRedirectedFrom());
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function forgottenPassword(state: void, payload: FormData) {
  await fetchApi(API.user.forgottenPassword, 'PATCH', payload);

  redirect('/forgotten-password/success');
}

export async function register(state: void, payload: FormData) {
  await fetchApi(API.user.register, 'POST', payload);

  redirect('/register/success');
}

export async function resetPassword(state: void, payload: FormData) {
  await fetchApi(API.user.resetPassword, 'PATCH', payload);

  redirect('/reset-password/success');
}
