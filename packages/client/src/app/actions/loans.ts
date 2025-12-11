'use server';

import { fetchApi } from "utils/fetch";
import API from 'constants/api';
import { revalidatePath } from "next/cache";

export async function createNewLoan(state: void, payload: FormData) {
  await fetchApi(API.loans.create, 'POST', payload);

  revalidatePath('/overview');
}
