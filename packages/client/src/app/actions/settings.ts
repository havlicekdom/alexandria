'use server';

import { fetchApi } from "utils/fetch";
import API from 'constants/api';
import { revalidatePath } from "next/cache";

export async function saveSettings(state: void, payload: FormData) {
  await fetchApi(API.user.update(payload.get('userId') as string), 'PATCH', payload);

  revalidatePath('/settings');
}
