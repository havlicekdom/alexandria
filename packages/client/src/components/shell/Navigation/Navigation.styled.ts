import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  textColor,
  primaryColor,
  spacing,
  secondaryBackgroundColor,
} from 'constants/styles';

export const NavigationWrapper = styled.nav`
  width: 25%;
  max-width: 275px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${secondaryBackgroundColor};
`;

export const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavigationItem = styled.li`
  padding: 0 ${spacing.medium} ${spacing.small};
`;

export const NavigationLink = styled(NavLink)`
  display: block;
  color: ${textColor};
  text-decoration: none;
  padding: ${spacing.small};
  border-radius: 10px;

  &:hover, &.active {
    background-color: ${primaryColor};
  }
`;

export const Logo = styled.h1`
  padding: 0 ${spacing.medium};
  margin: ${spacing.large} 0;
  text-align: center;
`;
