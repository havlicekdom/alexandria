import styled from 'styled-components';
import { darken } from 'polished';
import { spacing, textColor } from 'constants/styles';

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AuthorImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 150px;
    height: auto;
  }
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.h1`
  margin-top: 0;
`;

export const AuthorGenres = styled.div`
  margin-bottom: ${spacing.small};
`;

export const AuthorBirthDate = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.small};
`;

export const AuthorBio = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.medium};
`;
