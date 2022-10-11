import styled from 'styled-components';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { darken } from 'polished';

export const AuthorImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 60px;
    height: auto;
  }
`;

export const AuthorContent = styled.div``;

export const AuthorName = styled.div`
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.tiny};
`;

export const AuthorBio = styled.div`
  color: ${darken(0.15, textColor)};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const AuthorBioItem = styled.div`
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;
