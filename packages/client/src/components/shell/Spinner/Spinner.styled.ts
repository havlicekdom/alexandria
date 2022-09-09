import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { backgroundColor } from 'constants/styles';

const rotatingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerIcon = styled(FontAwesomeIcon)`
  animation: ${rotatingAnimation} 2s linear infinite;
  font-size: 50px;
`;
