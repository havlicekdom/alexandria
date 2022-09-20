import styled from 'styled-components';
import { spacing } from 'constants/styles';

export const UserMenuWrapper = styled.div`
  margin: auto 0 ${spacing.large};
  padding: 0 ${spacing.medium};
`;

export const UserMenu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const UserMenuItem = styled.li`
  padding: ${spacing.small} 0;
`;
