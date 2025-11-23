/* eslint-disable react/jsx-props-no-spreading */


import { yupResolver } from '@hookform/resolvers/yup';
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from 'components/common/FormInput';
import Icon from 'components/common/Icon';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUser, updateUser } from 'store/user/userSlice';
import { formValidation as translations } from 'translations';
import yup from 'utils/formValidation';

import * as S from './SettingsForm.styled';

type FormInputs = {
  userId: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required().max(255),
  password: yup.string().required().max(255),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], translations.passwordsDontMatch).max(255),
}).required();

function SettingsForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    await dispatch(updateUser({ userId: user.id, userData: formData }));
  };

  return (
    <S.SettingsForm onSubmit={handleSubmit(onSubmit)}>
      <S.SettingsHeader>
        <Icon icon={faCog} />
        Change your account details
      </S.SettingsHeader>
      <input data-testid="username" value={user.username} type="hidden" {...register('username')} />
      <FormInput data-testid="email" label="Email" value={user.email} fieldName="email" register={register} error={errors?.email} type="email" />
      <FormInput data-testid="password" label="Password" fieldName="password" register={register} error={errors?.password} type="password" />
      <FormInput data-testid="confirm-password" label="Confirm password" fieldName="confirmPassword" register={register} error={errors?.confirmPassword} type="password" />
      <S.SettingsFormButton data-testid="submit" type="submit" variant="primary" $full>
        <Icon icon={faSave} />
        Save
      </S.SettingsFormButton>
    </S.SettingsForm>
  );
}

export default SettingsForm;
