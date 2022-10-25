import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  fontSize,
  spacing,
} from 'constants/styles';

import Button from 'components/common/Button';

export const LoginHeader = styled.h2`
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const LoginFormLink = styled(Link)`
  font-size: ${fontSize.small};
`;

export const LoginFormResetPasswordLink = styled(LoginFormLink)`
  margin-top: ${spacing.tiny};
`;

export const LoginFormRegisterLink = styled(LoginFormLink)`
  margin-top: ${spacing.small};
  text-align: center;
`;

export const LoginFormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
