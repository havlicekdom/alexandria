"use server";

import { createSession, deleteSession, getRedirectedFrom } from "lib/session";
import { redirect } from "next/navigation";
import API from "constants/api";
import { fetchApi } from "utils/fetch";
import {
  ApiCallActionState,
  ApiCallActionStateWithValidation,
} from "types/api";
import { forgottenPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "lib/schemas";
import { validateFormData } from "utils/formValidation";

export async function login(
  state: ApiCallActionStateWithValidation,
  payload: FormData
): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(loginSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    const data = await fetchApi<{ access_token: string }>(
      API.login,
      "POST",
      payload
    );

    await createSession(data.access_token);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Failed to login",
    };
  }

  redirect(await getRedirectedFrom());
}

export async function logout(
  state: ApiCallActionState
): Promise<ApiCallActionState> {
  try {
    await fetchApi(API.logout, "DELETE");
    await deleteSession();
  } catch (e: any) {
    return {
      apiError: "Failed to logout",
    };
  }
  redirect("/login");
}

export async function forgottenPassword(
  state: ApiCallActionStateWithValidation,
  payload: FormData
): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(forgottenPasswordSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    await fetchApi(API.user.forgottenPassword, "PATCH", payload);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Request to API failed",
    };
  }

  redirect("/forgotten-password/success");
}

export async function register(
  state: ApiCallActionStateWithValidation,
  payload: FormData
): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(registerSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    await fetchApi(API.user.register, "POST", payload);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Request to API failed",
    };
  }

  redirect("/register/success");
}

export async function resetPassword(
  state: ApiCallActionStateWithValidation,
  payload: FormData
): Promise<ApiCallActionStateWithValidation> {
  try {
    const errors = await validateFormData(resetPasswordSchema, payload);

    if (Object.keys(errors).length > 0) {
      return {
        ...state,
        fieldErrors: errors,
      }
    }

    await fetchApi(API.user.resetPassword, "PATCH", payload);
  } catch (e: any) {
    return {
      ...state,
      apiError: "Request to API failed",
    };
  }

  redirect("/reset-password/success");
}
