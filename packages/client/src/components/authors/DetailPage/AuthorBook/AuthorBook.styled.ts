import styled from 'styled-components';
import { darken } from 'polished';
import { fontWeight, spacing, textColor } from 'constants/styles';

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
