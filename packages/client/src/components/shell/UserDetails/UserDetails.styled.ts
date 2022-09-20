import styled from 'styled-components';
import { fontSize, spacing, textColor } from 'constants/styles';

type AvatarProps = {
  iconSize: string;
};

export const UserDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const UserDetailsText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${spacing.tiny};
  font-size: ${fontSize.medium};
`;

export const UserDetailsUsername = styled.div`
  margin-bottom: 2px;
`;

export const UserDetailsEmail = styled.div``;

export const UserDetailsAvatar = styled.div<AvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 5px;
  background-color: ${textColor};

  div {
    height: ${({ iconSize }) => `${iconSize}px`};
  }
`;
