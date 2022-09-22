import styled from 'styled-components';
import { secondaryBackgroundColor, borderRadius, spacing } from 'constants/styles';

type PanelProps = {
  portion: number;
}

export const PanelWrapper = styled.div<PanelProps>`
  margin: 0 ${spacing.small};
  width: ${({ portion }) => `${Math.floor(100 / portion)}%`};
`;

export const Panel = styled.div`
  border: 2px solid ${secondaryBackgroundColor};
  border-radius: ${borderRadius.small};
  padding: ${spacing.medium};
  height: 100%;
`;

export const PanelHeader = styled.h3`
  margin-top: 0;
  margin-bottom: ${spacing.medium};
`;

export const PanelBody = styled.div``;
