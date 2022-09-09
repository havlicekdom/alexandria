/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import * as S from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'link' | 'primary';
  full?: boolean;
}

function Button(props: ButtonProps) {
  const { children, variant } = props;

  switch (variant) {
    case 'link':
      return (
        <S.ButtonLink {...props}>
          { children }
        </S.ButtonLink>
      );

    case 'primary':
      return (
        <S.ButtonPrimary {...props}>
          { children }
        </S.ButtonPrimary>
      );

    default:
      return null;
  }
}

Button.defaultProps = {
  full: false,
};

export default Button;
