"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "app/actions/auth";
import Icon from "components/common/Icon";
import { useActionState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  faArrowRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import yup from "utils/formValidation";
import routes from "constants/routes";
import Button from "components/common/Button";
import FormInput from "components/common/FormInput";

type FormInputs = {
  username: string;
  password: string;
};

const validationSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);
  const [_, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target as HTMLFormElement));
    });
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-[1_1_auto]"
    >
      <h2 className="text-center">
        <Icon icon={faUser} />
        Log in
      </h2>
      <FormInput
        data-testid="username"
        label="Username"
        fieldName="username"
        register={register}
        error={errors?.username}
        type="text"
      />
      <FormInput
        data-testid="password"
        label="Password"
        fieldName="password"
        register={register}
        error={errors?.password}
        type="password"
      />
      <a
        data-testid="reset-password"
        href={routes.forgottenPassword}
        className="mt-4"
      >
        Forgot your password?
      </a>
      <Button
        data-testid="submit"
        name="submit"
        type="submit"
        variant="primary"
        className="mt-4!"
      >
        <Icon icon={faArrowRightToBracket} />
        Log in
      </Button>
      <a
        data-testid="register"
        href={routes.register}
        className="mt-4 text-center"
      >
        New to the app? Create your account here.
      </a>
    </form>
  );
}
