import styled, { css } from 'styled-components';
import { spacing, fontSize } from 'constants/styles';
import Button from '../Button';

type FloatingButtonProps = {
  large?: boolean;
}

export const FloatingButton = styled(Button)<FloatingButtonProps>`
  position: fixed;
  bottom: ${spacing.medium};
  right: ${spacing.medium};

  ${({ large }) => large && css`
    font-size: ${fontSize.large};
  `}
`;
