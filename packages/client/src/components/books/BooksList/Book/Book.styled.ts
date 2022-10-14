import styled from 'styled-components';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { darken } from 'polished';

const BookLine = styled.div`
  color: ${darken(0.15, textColor)};
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
