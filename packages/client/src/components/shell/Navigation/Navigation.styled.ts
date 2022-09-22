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
  border-right: 2px solid ${secondaryBackgroundColor};
`;

export const Navigation = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavigationItem = styled.li`
  padding: 0 ${spacing.medium} ${spacing.small} 0;
`;

export const NavigationLink = styled(NavLink)`
  display: block;
  color: ${textColor};
  text-decoration: none;
  padding: ${spacing.small};
  padding-left: ${spacing.medium};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.1s ease-in-out;

  &:hover, &.active {
    background-color: ${primaryColor};
  }
`;

export const Logo = styled.h1`
  padding: 0 ${spacing.medium};
  margin: ${spacing.large} 0;
`;
