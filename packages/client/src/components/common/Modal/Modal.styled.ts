import styled, { css } from 'styled-components';
import {
  spacing, textColor, backgroundColor, borderRadius, ThemeVariants,
} from 'constants/styles';
import Button from '../Button';
import { Icon } from '../Icon/Icon.styled';

type ModalSize = 'default' | 'small';

type ModalBodyProps = {
  $currentTheme: ThemeVariants;
  size?: ModalSize;
};

const getModalDimensions = (size: ModalSize = 'default') => {
  switch (size) {
    case 'default':
      return css`
        width: 60%;
        max-width: 500px;
        height: 60%;
        max-height: 600px;
      `;
    case 'small':
      return css`
        width: 45%;
        max-width: 400px;
        height: 45%;
        max-height: 300px;
      `;
    default:
      return css``;
  }
};

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBackground = styled.div`
  content: "";
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const ModalBody = styled.div<ModalBodyProps>`
  padding: ${spacing.medium};
  background-color: ${({ $currentTheme }) => backgroundColor($currentTheme)};
  color: ${({ $currentTheme }) => textColor($currentTheme)};
  border-radius: ${borderRadius.small};
  position: relative;

  ${({ size }) => getModalDimensions(size)}
`;

export const ModalContent = styled.div`
  margin-top: ${spacing.tiny};
  height: 100%;
`;

export const ModalClose = styled(Button)`
  position: absolute;
  top: ${spacing.small};
  right: ${spacing.small};
  width: 18px;

  ${Icon} {
    margin-right: 0;
  }
`;
