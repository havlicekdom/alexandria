import { useContext } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from 'context/ThemeContext';

import * as S from './Spinner.styled';

function Spinner() {
  const { theme } = useContext(ThemeContext);

  return (
    <S.SpinnerWrapper $currentTheme={theme}>
      <S.SpinnerIcon icon={faSpinner} />
    </S.SpinnerWrapper>
  );
}

export default Spinner;
