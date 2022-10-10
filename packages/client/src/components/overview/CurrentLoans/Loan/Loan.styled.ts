import styled, { css } from 'styled-components';
import {
  errorColor, fontWeight, spacing, textColor,
} from 'constants/styles';
import { darken } from 'polished';
import { Icon } from 'components/common/Icon/Icon.styled';

type EndsInProps = {
  isOverdue: boolean;
};

export const LoanIcon = styled.div`
  ${Icon} {
    font-size: 44px;
    margin-right: ${spacing.small};
  }
`;

export const LoanContent = styled.div``;

export const LoanBookName = styled.div`
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.tiny};
`;

export const LoanBookDescription = styled.div`
  color: ${darken(0.15, textColor)};
`;

export const LoanBookDescriptionItem = styled.div`
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LoanBookDescriptionEndsIn = styled(LoanBookDescriptionItem)<EndsInProps>`
  ${({ isOverdue }) => isOverdue && css`
    color: ${errorColor};
  `}
`;
