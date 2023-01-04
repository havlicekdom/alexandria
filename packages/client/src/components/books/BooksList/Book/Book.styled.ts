import styled from 'styled-components';
import { darken } from 'polished';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';

const BookLine = styled.div<ComponentWithTheme>`
  color: ${({ currentTheme }) => darken(0.15, textColor(currentTheme))};
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BookName = styled(BookLine)`
  font-weight: ${fontWeight.bold};
`;

export const BookAuthor = styled(BookLine)``;

export const BookPills = styled(BookLine)``;
