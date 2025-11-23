/* eslint-disable import/prefer-default-export */

import styled, { createGlobalStyle, css } from 'styled-components';
import { darken, lighten } from 'polished';
import { backgroundColor, textColor } from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';
import { isDarkTheme } from 'utils/styles';

export const App = styled.div<ComponentWithTheme>`
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  ${({ $currentTheme }) => css`
    background-color: ${backgroundColor($currentTheme)};
    color: ${textColor($currentTheme)};
  `};
`;

export const GlobalStyles = createGlobalStyle<ComponentWithTheme>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #1d1d2a;
    color: #fefefe;
    line-height: 1.33;
  }

  ${({ $currentTheme }) => css`
    a {
      color: ${textColor($currentTheme)};
      text-decoration: none;

      &:hover {
        color: ${isDarkTheme($currentTheme) ? darken(0.2, textColor($currentTheme)) : lighten(0.2, textColor($currentTheme))};
      }
    }
  `}
`;
