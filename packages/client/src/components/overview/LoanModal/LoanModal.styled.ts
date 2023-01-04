import styled from 'styled-components';
import { errorColor, spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
`;

export const Legend = styled.legend`
  margin-bottom: ${spacing.small};
`;

export const SubmitButton = styled(Button)`
  margin-top: auto !important;
`;

export const Error = styled.span`
  display: inline-block;
  margin-top: ${spacing.tiny};
  color: ${errorColor};
`;
