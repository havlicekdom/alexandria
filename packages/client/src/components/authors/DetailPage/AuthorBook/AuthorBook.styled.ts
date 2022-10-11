import styled from 'styled-components';
import { darken } from 'polished';
import { fontWeight, spacing, textColor } from 'constants/styles';

export const AuthorBookImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 60px;
    height: auto;
  }
`;

export const AuthorBookContent = styled.div``;

const AuthorBookLine = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AuthorBookName = styled(AuthorBookLine)`
  font-weight: ${fontWeight.bold};
`;

export const AuthorBookPills = styled(AuthorBookLine)``;

export const AuthorBookDescription = styled(AuthorBookLine)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
