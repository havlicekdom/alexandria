import styled from 'styled-components';

import {
  borderRadius,
  secondaryBackgroundColor,
  spacing,
} from 'constants/styles';

export const ResetPasswordWrapper = styled.div`
  display: flex;
  width: 350px;
  align-self: center;
  margin: 0 auto;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.small};
  background-color: ${secondaryBackgroundColor};
`;
