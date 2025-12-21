'use server';

import { fetchApi } from "utils/fetch";
import API from 'constants/api';
import { revalidatePath } from "next/cache";
import { ApiCallActionStateWithValidation } from "types/api";
import { validateFormData } from "utils/formValidation";
import { loanModalSchema } from "lib/schemas";

export async function createNewLoan(
  state: ApiCallActionStateWithValidation,
  payload: FormData
): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(loanModalSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    await fetchApi(API.loans.create, 'POST', payload);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Request to create a new loan failed",
    };
  }

  revalidatePath('/dashboard');

  return {};
}
