import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as S from './Spinner.styled';

function Spinner() {
  return (
    <S.SpinnerWrapper>
      <S.SpinnerIcon icon={faSpinner} />
    </S.SpinnerWrapper>
  );
}

export default Spinner;
