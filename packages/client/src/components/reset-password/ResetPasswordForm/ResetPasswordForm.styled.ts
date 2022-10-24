import styled from 'styled-components';
import { spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const ResetPasswordHeader = styled.h2`
  text-align: center;
`;

export const ResetPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const ResetPasswordFormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
