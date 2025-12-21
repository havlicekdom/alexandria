'use server';

import { fetchApi } from "utils/fetch";
import API from 'constants/api';
import { revalidatePath } from "next/cache";
import { ApiCallActionStateWithValidation } from "types/api";
import { settingsSchema } from "lib/schemas";
import { validateFormData } from "utils/formValidation";

export async function saveSettings(state: ApiCallActionStateWithValidation, payload: FormData): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(settingsSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    await fetchApi(API.user.update(payload.get('userId') as string), 'PATCH', payload);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Request to API failed",
    };
  }

  revalidatePath('/settings');
  return state;
}
