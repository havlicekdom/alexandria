import React from 'react';

import * as S from './Pill.styled';

export type PillVariant = 'primary' | 'success' | 'info' | 'error' | 'default';

type Props = {
  children: React.ReactNode;
  variant?: PillVariant;
};

function Pill({ children, variant }: Props) {
  return (
    <S.Pill variant={variant}>
      { children }
    </S.Pill>
  );
}

Pill.defaultProps = {
  variant: 'default',
};

export default Pill;
