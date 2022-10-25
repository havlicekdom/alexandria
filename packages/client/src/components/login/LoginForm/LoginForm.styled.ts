import styled from 'styled-components';

import {
  spacing,
} from 'constants/styles';

import { FormLink } from 'components/common/FormPage/FormPage.styled';

export const LoginFormResetPasswordLink = styled(FormLink)`
  margin-top: ${spacing.tiny};
`;

export const LoginFormRegisterLink = styled(FormLink)`
  margin-top: ${spacing.small};
  text-align: center;
`;
