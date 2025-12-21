'use client';

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import { useActionState, useTransition } from "react";
import { register as registerApi } from "app/actions/auth";
import Button from "components/common/Button";
import { ApiCallActionStateWithValidation } from "types/api";
import { FormError } from "../FormError";
import { InferType } from "yup";
import { registerSchema } from "lib/schemas";
import { initialState } from "constants/formDefaultState";

type FormInputs = InferType<typeof registerSchema>;

export default function RegisterForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState<ApiCallActionStateWithValidation, FormData>(registerApi, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target));
    });
  };

  return (
    <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">
        <Icon icon={faUserPlus} />
        Create your account
      </h2>
      <FormInput
        data-testid="username"
        label="Username"
        fieldName="username"
        register={register}
        error={errors?.username || state.fieldErrors.username}
        type="text"
      />
      <FormInput
        data-testid="email"
        label="Email"
        fieldName="email"
        register={register}
        error={errors?.email || state.fieldErrors.email}
        type="email"
      />
      <FormInput
        data-testid="password"
        label="Password"
        fieldName="password"
        register={register}
        error={errors?.password || state.fieldErrors.password}
        type="password"
      />
      <FormInput
        data-testid="confirm-password"
        label="Confirm password"
        fieldName="confirmPassword"
        register={register}
        error={errors?.confirmPassword || state.fieldErrors.confirmPassword}
        type="password"
      />
      {state.apiError && <FormError>{state.apiError}</FormError>}
      <Button
        data-testid="submit"
        type="submit"
        variant="primary"
        full
        className="mt-4!"
        isLoading={isPending}
      >
        <Icon icon={faUserPlus} />
        Create account
      </Button>
    </form>
  );
}
