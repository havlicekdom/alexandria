/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { ThemeContext } from 'context/ThemeContext';

import * as S from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'link' | 'primary' | 'close';
  full?: boolean;
}

function Button(props: ButtonProps) {
  const { children, variant } = props;
  const { theme } = useContext(ThemeContext);

  switch (variant) {
    case 'link':
      return (
        <S.ButtonLink currentTheme={theme} {...props}>
          { children }
        </S.ButtonLink>
      );

    case 'primary':
      return (
        <S.ButtonPrimary currentTheme={theme} {...props}>
          { children }
        </S.ButtonPrimary>
      );

    case 'close':
      return (
        <S.ButtonClose currentTheme={theme} {...props}>
          { children }
        </S.ButtonClose>
      );

    default:
      return null;
  }
}

Button.defaultProps = {
  full: false,
};

export default Button;
