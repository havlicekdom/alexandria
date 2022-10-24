import styled from 'styled-components';
import Button from 'components/common/Button';
import { spacing } from 'constants/styles';

export const SettingsHeader = styled.h2`
  text-align: center;
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 50%;
  min-width: 400px;
  max-width: 100%;
  margin: 0 auto;
`;

export const SettingsFormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
