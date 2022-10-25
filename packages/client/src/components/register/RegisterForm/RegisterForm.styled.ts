import styled from 'styled-components';
import { spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const RegisterHeader = styled.h2`
  text-align: center;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const RegisterFormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
