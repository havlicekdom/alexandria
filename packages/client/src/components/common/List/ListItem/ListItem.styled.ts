import styled from 'styled-components';
import { spacing, secondaryBackgroundColor } from 'constants/styles';

export const ListItem = styled.div`
  display: flex;
  margin-bottom: ${spacing.medium};
  padding-bottom: ${spacing.medium};
  border-bottom: 2px solid ${secondaryBackgroundColor};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
