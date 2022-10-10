import styled from 'styled-components';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { darken } from 'polished';
import { Icon } from 'components/common/Icon/Icon.styled';

export const AuthorIcon = styled.div`
  ${Icon} {
    font-size: 44px;
    margin-right: ${spacing.small};
  }
`;

export const AuthorContent = styled.div``;

export const AuthorName = styled.div`
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.tiny};
`;

export const AuthorBio = styled.div`
  color: ${darken(0.15, textColor)};
`;

export const AuthorBioItem = styled.div`
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;
