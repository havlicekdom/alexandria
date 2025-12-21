"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import { useParams } from "next/navigation";
import { useActionState, useTransition } from "react";
import { resetPassword } from "app/actions/auth";
import Button from "components/common/Button";
import { FormError } from "../../FormError";
import { InferType } from "yup";
import { resetPasswordSchema } from "lib/schemas";
import { ApiCallActionStateWithValidation } from "types/api";
import { initialState } from "constants/formDefaultState";

type FormInputs = InferType<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState<ApiCallActionStateWithValidation, FormData>(resetPassword, initialState);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(resetPasswordSchema),
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
        Set your new password
      </h2>
      <input data-testid="id" type="hidden" value={id} {...register("id")} />
      <FormInput
        data-testid="password"
        label="New password"
        register={register}
        type="password"
        fieldName="password"
        error={errors.password || state.fieldErrors.password}
      />
      <FormInput
        data-testid="confirm-password"
        label="Confirm your new password"
        register={register}
        type="password"
        fieldName="confirmPassword"
        error={errors.confirmPassword || state.fieldErrors.confirmPassword}
      />
      {state.apiError && <FormError>{state.apiError}</FormError>}
      <Button
        data-testid="submit"
        name="submit"
        type="submit"
        variant="primary"
        full
        className="mt-4!"
        isLoading={isPending}
      >
        Save password
      </Button>
    </form>
  );
}
