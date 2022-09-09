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
  max-width: 260px;
  background-color: ${secondaryBackgroundColor};
  padding-top: ${spacing.large};
  display: flex;
  flex-direction: column;
  box-shadow: 5px 0px 30px 5px rgba(20, 20, 20, 0.4);
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
