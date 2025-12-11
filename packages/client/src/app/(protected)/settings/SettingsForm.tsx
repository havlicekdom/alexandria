'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from 'components/common/FormInput';
import Icon from 'components/common/Icon';
import { formValidation as translations } from 'translations';
import yup from 'utils/formValidation';

import Button from 'components/common/Button';
import { useActionState, useTransition } from 'react';
import { saveSettings } from 'app/actions/settings';
import { User } from 'types/user';

type FormInputs = {
  userId: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  user: User;
};

const validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required().max(255),
  password: yup.string().required().max(255),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], translations.passwordsDontMatch).max(255),
}).required();

export default function SettingsForm({ user }: Props) {
  const [state, formAction] = useActionState(saveSettings, undefined);
  const [_, startTransition] = useTransition();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (_, e) => {
    startTransition(() => {
      formAction(new FormData(e?.target));
    });
  };

  return (
    <form action={formAction} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 min-w-[400px] max-w-full m-[0_auto]">
      <h2 className="text-center">
        <Icon icon={faCog} />
        Change your account details
      </h2>
      <input type="hidden" value={user.id} {...register('userId')} />
      <input data-testid="username" value={user.username} type="hidden" {...register('username')} />
      <FormInput data-testid="email" label="Email" value={user.email} fieldName="email" register={register} error={errors?.email} type="email" />
      <FormInput data-testid="password" label="Password" fieldName="password" register={register} error={errors?.password} type="password" />
      <FormInput data-testid="confirm-password" label="Confirm password" fieldName="confirmPassword" register={register} error={errors?.confirmPassword} type="password" />
      <Button data-testid="submit" type="submit" variant="primary" full className="mt-16!">
        <Icon icon={faSave} />
        Save
      </Button>
    </form>
  );
}
