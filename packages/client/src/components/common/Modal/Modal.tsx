import React, { useContext } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from 'context/ThemeContext';
import Icon from '../Icon';

import * as S from './Modal.styled';

type Props = {
  children: React.ReactNode;
  close: () => void;
  size?: 'default' | 'small';
}

function Modal({ children, close, size }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <S.ModalWrapper>
      <S.ModalBody currentTheme={theme} size={size}>
        <S.ModalClose variant="close" onClick={() => close()} data-testid="modal-close">
          <Icon icon={faTimes} />
        </S.ModalClose>
        <S.ModalContent>
          { children }
        </S.ModalContent>
      </S.ModalBody>
      <S.ModalBackground onClick={() => close()} data-testid="modal-background" />
    </S.ModalWrapper>
  );
}

Modal.defaultProps = {
  size: 'default',
};

export default Modal;
