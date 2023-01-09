import styled from 'styled-components';
import { lighten } from 'polished';
import {
  spacing, successColor, borderRadius,
} from 'constants/styles';

export const SuccessMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  align-items: center;
  padding: ${spacing.small};
  background-color: ${lighten(0.1, successColor)};
  border-radius: ${borderRadius.small};
`;

export const SuccessMessageIcon = styled.div`
  font-size: 150px;
`;

export const SuccessMessageContent = styled.div`
  text-align: center;
`;
