import { FieldError } from "react-hook-form";

export type ApiCallActionState = {
  apiError?: string;
};

export type ApiCallActionStateWithValidation = ApiCallActionState & {
  fieldErrors?: {
    [key: string]: FieldError;
  };
};
