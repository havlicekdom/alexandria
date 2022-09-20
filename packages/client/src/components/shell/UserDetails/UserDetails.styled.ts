import styled from 'styled-components';
import { spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const UserDetailsWrapper = styled.div`
  margin: auto 0 ${spacing.large};
  padding: 0 ${spacing.medium};
`;

export const UserDetailsButton = styled(Button)`
  display: flex;
  width: 100%;
`;
