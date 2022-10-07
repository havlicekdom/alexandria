import styled from 'styled-components';
import { darken } from 'polished';
import { fontWeight, spacing, textColor } from 'constants/styles';
import { Icon } from 'components/common/Icon/Icon.styled';

export const LatestBookIcon = styled.div`
  ${Icon} {
    font-size: 44px;
    margin-right: ${spacing.small};
  }
`;

export const LatestBookContent = styled.div``;

const LatestBookLine = styled.div`
  color: ${darken(0.15, textColor)};
  margin-bottom: ${spacing.tiny};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LatestBookName = styled(LatestBookLine)`
  font-weight: ${fontWeight.bold};
`;

export const LatestBookAuthor = styled(LatestBookLine)``;

export const LatestBookPills = styled(LatestBookLine)``;

export const LatestBookDescription = styled(LatestBookLine)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
