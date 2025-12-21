import * as yup from "yup";

import { formValidation as translations } from "translations";
import { FieldError } from "react-hook-form";

yup.setLocale({
  mixed: {
    required: translations.fieldRequired,
  },
  string: {
    email: translations.invalidEmail,
  },
});

export default yup;

export async function validateFormData(schema: yup.Schema, payload: FormData) {
  try {
    await schema.validate(Object.fromEntries(payload.entries()), {
      abortEarly: false,
    });
  } catch (e: any) {
    if (e instanceof yup.ValidationError) {
      return e.inner.reduce<Record<string, FieldError>>((acc, err) => {
        if (err.path)
          acc[err.path] = {
            type: err.cause as FieldError["type"],
            message: err.message,
          };
        return acc;
      }, {});
    }
  }

  return {};
}
