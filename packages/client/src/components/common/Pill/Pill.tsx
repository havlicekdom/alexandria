import { useContext } from 'react';
import { ThemeContext } from 'context/ThemeContext';

import * as S from './Pill.styled';

export type PillVariant = 'primary' | 'success' | 'info' | 'error' | 'default';

type Props = {
  children: React.ReactNode;
  $variant?: PillVariant;
};

function Pill({ children, $variant }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <S.Pill $currentTheme={theme} $variant={$variant}>
      { children }
    </S.Pill>
  );
}

Pill.defaultProps = {
  $variant: 'default',
};

export default Pill;
