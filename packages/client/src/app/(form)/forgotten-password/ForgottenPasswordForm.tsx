"use client";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Icon from "components/common/Icon";
import FormInput from "components/common/FormInput";
import yup from "utils/formValidation";
import { useActionState, useTransition } from "react";
import { forgottenPassword } from "app/actions/auth";
import Button from "components/common/Button";

type FormInputs = {
  email: string;
};

const validationSchema = yup
  .object({
    email: yup.string().email().required().max(255),
  })
  .required();

function ForgottenPasswordForm() {
  const [_, startTransition] = useTransition();
  const [state, formAction] = useActionState(forgottenPassword, undefined);
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
        Forgotten password?
      </h2>
      <FormInput
        data-testid="email"
        label="Your email"
        register={register}
        type="email"
        fieldName="email"
        error={errors.email}
      />
      <Button
        data-testid="submit"
        name="submit"
        type="submit"
        variant="primary"
        className="mt-4!"
      >
        Generate new password
      </Button>
    </form>
  );
}

export default ForgottenPasswordForm;
