import styled from 'styled-components';
import { darken } from 'polished';
import { spacing, textColor } from 'constants/styles';

export const BookWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BookImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 150px;
    height: auto;
  }
`;

export const BookInfo = styled.div``;

export const BookName = styled.h1`
  margin-top: 0;
`;

export const BookAuthor = styled.h3``;

export const BookGenres = styled.div`
  margin-bottom: ${spacing.small};
`;

export const BookDescription = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.medium};
`;
