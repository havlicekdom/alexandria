import styled from 'styled-components';
import { darken } from 'polished';
import {
  fontWeight, spacing, textColor,
} from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';

export const LatestBookImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 60px;
    height: auto;
  }
`;

export const LatestBookContent = styled.div``;

const LatestBookLine = styled.div<ComponentWithTheme>`
  color: ${({ currentTheme }) => darken(0.15, textColor(currentTheme))};
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LatestBookName = styled(LatestBookLine)`
  font-weight: ${fontWeight.bold};
`;

export const LatestBookAuthor = styled(LatestBookLine)``;

export const LatestBookPills = styled(LatestBookLine)``;

export const LatestBookDescription = styled(LatestBookLine)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
