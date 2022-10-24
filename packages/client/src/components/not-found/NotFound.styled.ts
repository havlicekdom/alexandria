import styled from 'styled-components';
import { fontSize, spacing } from 'constants/styles';
import Button from 'components/common/Button';

export const NotFoundWrapper = styled.div`
  width: 80%;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NotFoundCode = styled.div`
  font-size: 150px;
`;

export const NotFoundHeader = styled.h1`
  margin-top: 0;
`;

export const NotFoundContent = styled.div`
  font-size: ${fontSize.large};
`;

export const NotFoundButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
