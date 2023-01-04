import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  textColor,
  primaryColor,
  spacing,
  secondaryBackgroundColor,
  backgroundColor,
  ThemeVariants,
} from 'constants/styles';
import { isDarkTheme } from 'utils/styles';

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

// Using camel case for current theme prop caused a react error and this is a workaround
export const NavigationLink = styled(NavLink)<{ currenttheme: ThemeVariants }>`
  display: block;
  color: ${({ currenttheme }) => textColor(currenttheme)};
  text-decoration: none;
  padding: ${spacing.small};
  padding-left: ${spacing.medium};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.1s ease-in-out;

  &:hover, &.active {
    background-color: ${primaryColor};

    ${({ currenttheme }) => !isDarkTheme(currenttheme) ? css`
      color: ${backgroundColor(currenttheme)};
    ` : ''};
  }
`;

export const Logo = styled.h1`
  padding: 0 ${spacing.medium};
  margin: ${spacing.large} 0;
  white-space: nowrap;
`;
