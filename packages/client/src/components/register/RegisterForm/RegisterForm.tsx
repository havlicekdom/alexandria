/* eslint-disable react/jsx-props-no-spreading */

import { useContext } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'utils/formValidation';

import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';
import {
  Form as FormStyled,
  FormHeader as FormHeaderStyled,
  FormButton as FormButtonStyled,
} from 'components/common/FormPage/FormPage.styled';
import { useAppDispatch } from 'store/hooks';
import { registerUser } from 'store/user/userSlice';
import { formValidation as translations } from 'translations';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object({
  username: yup.string().required().max(255),
  email: yup.string().email().required().max(255),
  password: yup.string().required().max(255),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], translations.passwordsDontMatch).max(255),
}).required();

function RegisterForm() {
  const { setIsSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    await dispatch(registerUser(formData));
    setIsSuccessfullySubmitted(true);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormHeaderStyled>
        <Icon icon={faUserPlus} />
        Create your account
      </FormHeaderStyled>
      <FormInput data-testid="username" label="Username" fieldName="username" register={register} error={errors?.username} type="text" />
      <FormInput data-testid="email" label="Email" fieldName="email" register={register} error={errors?.email} type="email" />
      <FormInput data-testid="password" label="Password" fieldName="password" register={register} error={errors?.password} type="password" />
      <FormInput data-testid="confirm-password" label="Confirm password" fieldName="confirmPassword" register={register} error={errors?.confirmPassword} type="password" />
      <FormButtonStyled data-testid="submit" type="submit" variant="primary" $full>
        <Icon icon={faUserPlus} />
        Create account
      </FormButtonStyled>
    </FormStyled>
  );
}

export default RegisterForm;
