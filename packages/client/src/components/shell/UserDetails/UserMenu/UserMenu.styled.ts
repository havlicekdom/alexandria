import styled from 'styled-components';

import {
  secondaryBackgroundColor,
  spacing,
} from 'constants/styles';

export const UserMenuWrapper = styled.div`
  position: absolute;
  left: 100%;
  bottom: -${spacing.small};
  background-color: ${secondaryBackgroundColor};
  padding: ${spacing.small};
`;

export const UserMenu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const UserMenuItem = styled.li``;

export const UserMenuHeader = styled.li``;

export const UserMenuHeaderName = styled.h4``;

export const UserMenuHeaderEmail = styled.h6``;
