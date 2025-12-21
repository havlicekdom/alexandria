"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { faCog, faSave } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "components/common/FormInput";
import Icon from "components/common/Icon";

import Button from "components/common/Button";
import { useActionState, useTransition } from "react";
import { saveSettings } from "app/actions/settings";
import { User } from "types/user";
import { ApiCallActionStateWithValidation } from "types/api";
import { FormError } from "app/(form)/FormError";
import { InferType } from "yup";
import { settingsSchema } from "lib/schemas";
import { initialState } from "constants/formDefaultState";

type FormInputs = InferType<typeof settingsSchema> & { userId: string };

type Props = {
  user: User;
};

export default function SettingsForm({ user }: Props) {
  const [state, formAction, isPending] = useActionState<
    ApiCallActionStateWithValidation,
    FormData
  >(saveSettings, initialState);
  const [_, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(settingsSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target));
    });
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-1/2 min-w-[400px] max-w-full m-[0_auto]"
    >
      <h2 className="text-center">
        <Icon icon={faCog} />
        Change your account details
      </h2>
      <input type="hidden" value={user.id} {...register("userId")} />
      <input
        data-testid="username"
        value={user.username}
        type="hidden"
        {...register("username")}
      />
      <FormInput
        data-testid="email"
        label="Email"
        value={user.email}
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
        className="mt-16!"
        isLoading={isPending}
      >
        <Icon icon={faSave} />
        Save
      </Button>
    </form>
  );
}
