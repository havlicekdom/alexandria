import React from 'react';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import { Icon } from '../Icon/Icon.styled';

import * as S from './SuccessMessage.styled';

type Props = {
  children: React.ReactNode;
};

function SuccessMessage({ children }: Props) {
  return (
    <S.SuccessMessageWrapper>
      <S.SuccessMessageIcon>
        <Icon icon={faCheckCircle} />
      </S.SuccessMessageIcon>
      <S.SuccessMessageContent>
        { children }
      </S.SuccessMessageContent>
    </S.SuccessMessageWrapper>
  );
}

export default SuccessMessage;
