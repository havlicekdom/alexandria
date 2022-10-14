import styled from 'styled-components';
import { darken } from 'polished';
import { spacing, textColor } from 'constants/styles';

export const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${spacing.medium};
`;

export const HeadingImage = styled.div`
  margin-right: ${spacing.small};

  img {
    width: 150px;
    height: auto;
  }
`;

export const HeadingInfo = styled.div``;

export const HeadingName = styled.h1`
  margin-top: 0;
`;

export const HeadingText = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.small};
`;
