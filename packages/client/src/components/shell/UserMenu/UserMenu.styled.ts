import styled from 'styled-components';
import { primaryColor, spacing } from 'constants/styles';
import { lighten } from 'polished';
import NavLink from 'components/shell/Navigation/NavLink';

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

export const UserMenuLink = styled(NavLink)`
  &.active {
    color: ${lighten(0.1, primaryColor)};

    &:hover {
      color: ${lighten(0.2, primaryColor)};
    }
  }
`;
