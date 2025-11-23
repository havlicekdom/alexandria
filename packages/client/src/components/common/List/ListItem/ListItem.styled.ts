import styled from 'styled-components';
import { darken } from 'polished';
import {
  fontWeight, spacing, textColor, secondaryBackgroundColor,
} from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';

export const ListItem = styled.div`
  display: flex;
  margin-bottom: ${spacing.medium};
  padding-bottom: ${spacing.medium};
  border-bottom: 2px solid ${secondaryBackgroundColor};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const ListItemImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 60px;
    height: auto;
  }
`;

export const ListItemContentWrapper = styled.div``;

export const ListItemName = styled.div`
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.tiny};
`;

export const ListItemContent = styled.div<ComponentWithTheme>`
  color: ${({ $currentTheme }) => darken(0.15, textColor($currentTheme))};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ListItemContentItem = styled.div`
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;
