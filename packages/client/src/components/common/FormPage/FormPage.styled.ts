import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  borderRadius,
  fontSize,
  secondaryBackgroundColor,
  spacing,
} from 'constants/styles';
import Button from '../Button';

export const FormPageWrapper = styled.div`
  display: flex;
  width: 350px;
  align-self: center;
  margin: 0 auto;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.small};
  background-color: ${secondaryBackgroundColor};
`;

export const FormHeader = styled.h2`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const FormLink = styled(Link)`
  font-size: ${fontSize.small};
`;

export const FormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
