"use client";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import { useActionState, useTransition } from "react";
import { forgottenPassword } from "app/actions/auth";
import Button from "components/common/Button";
import { FormError } from "../FormError";
import { InferType } from "yup";
import { forgottenPasswordSchema } from "lib/schemas";
import { ApiCallActionStateWithValidation } from "types/api";
import { initialState } from "constants/formDefaultState";

type FormInputs = InferType<typeof forgottenPasswordSchema>;

export default function ForgottenPasswordForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState<ApiCallActionStateWithValidation, FormData>(forgottenPassword, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(forgottenPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target));
    });
  };

  return (
    <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">
        <Icon icon={faKey} />
        Forgotten password?
      </h2>
      <FormInput
        data-testid="email"
        label="Your email"
        register={register}
        type="email"
        fieldName="email"
        error={errors.email || state.fieldErrors.email}
      />
      {state.apiError && <FormError>{state.apiError}</FormError>}
      <Button
        data-testid="submit"
        name="submit"
        type="submit"
        variant="primary"
        className="mt-4!"
        isLoading={isPending}
      >
        Generate new password
      </Button>
    </form>
  );
}
