import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const UserDetailsWrapper = styled.div`
  margin: auto 0 ${spacing.large};
  padding: 0 ${spacing.medium};
  position: relative;
`;

export const UserDetailsButton = styled(Button)`
  display: flex;
  width: 100%;
`;

export const UserDetailsIcon = styled(FontAwesomeIcon)`
  &:last-child {
    margin-left: auto;
    align-self: end;
  }
`;
