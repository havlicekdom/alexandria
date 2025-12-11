'use client';

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "utils/formValidation";

import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import { formValidation as translations } from "translations";
import { useActionState, useTransition } from "react";
import { register as registerApi } from "app/actions/auth";
import Button from "components/common/Button";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    username: yup.string().required().max(255),
    email: yup.string().email().required().max(255),
    password: yup.string().required().max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], translations.passwordsDontMatch)
      .max(255),
  })
  .required();

function RegisterForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction] = useActionState(registerApi, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
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
        error={errors?.username}
        type="text"
      />
      <FormInput
        data-testid="email"
        label="Email"
        fieldName="email"
        register={register}
        error={errors?.email}
        type="email"
      />
      <FormInput
        data-testid="password"
        label="Password"
        fieldName="password"
        register={register}
        error={errors?.password}
        type="password"
      />
      <FormInput
        data-testid="confirm-password"
        label="Confirm password"
        fieldName="confirmPassword"
        register={register}
        error={errors?.confirmPassword}
        type="password"
      />
      <Button
        data-testid="submit"
        type="submit"
        variant="primary"
        full
        className="mt-4!"
      >
        <Icon icon={faUserPlus} />
        Create account
      </Button>
    </form>
  );
}

export default RegisterForm;
