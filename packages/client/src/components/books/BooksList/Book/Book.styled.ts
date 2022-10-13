import styled from 'styled-components';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { darken } from 'polished';

export const BookImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 60px;
    height: auto;
  }
`;

export const BookContent = styled.div``;

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

export const BookDescription = styled(BookLine)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
