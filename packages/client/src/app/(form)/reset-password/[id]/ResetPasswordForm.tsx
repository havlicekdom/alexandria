"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import { formValidation as translations } from "translations";
import yup from "utils/formValidation";
import { useParams } from "next/navigation";
import { useActionState, useTransition } from "react";
import { resetPassword } from "app/actions/auth";
import Button from "components/common/Button";

type FormInputs = {
  id: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    id: yup.string().required(),
    password: yup.string().required().max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], translations.passwordsDontMatch)
      .max(255),
  })
  .required();

function ResetPasswordForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction] = useActionState(resetPassword, undefined);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
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
        error={errors.password}
      />
      <FormInput
        data-testid="confirm-password"
        label="Confirm your new password"
        register={register}
        type="password"
        fieldName="confirmPassword"
        error={errors.confirmPassword}
      />
      <Button
        data-testid="submit"
        name="submit"
        type="submit"
        variant="primary"
        full
        className="mt-4!"
      >
        Save password
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
