import React from 'react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';
import {
  Form as FormStyled,
  FormHeader as FormHeaderStyled,
  FormButton as FormButtonStyled,
} from 'components/common/FormPage/FormPage.styled';
import { useAppDispatch } from 'store/hooks';
import { resetPassword } from 'store/user/userSlice';
import yup from 'utils/formValidation';

type FormInputs = {
  email: string;
};

const validationSchema = yup.object({
  email: yup.string().email().required().max(255),
}).required();

function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    dispatch(resetPassword(formData));
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormHeaderStyled>
        <Icon icon={faKey} />
        Forgotten password?
      </FormHeaderStyled>
      <FormInput data-testid="email" label="Your email" register={register} type="email" fieldName="email" error={errors.email} />
      <FormButtonStyled data-testid="submit" name="submit" type="submit" variant="primary" full>
        Generate new password
      </FormButtonStyled>
    </FormStyled>
  );
}

export default ResetPasswordForm;
