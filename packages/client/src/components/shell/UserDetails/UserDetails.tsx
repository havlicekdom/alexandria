import React from 'react';
import Jdenticon from 'react-jdenticon';

import { useAppSelector } from 'store/hooks';
import { selectUser } from 'store/user/userSlice';

import * as S from './UserDetails.styled';

function UserDetails() {
  const user = useAppSelector(selectUser);
  const iconSize = '25';
  const env = process.env.NODE_ENV;

  return (
    <S.UserDetailsWrapper>
      <S.UserDetailsAvatar iconSize={iconSize}>
        {env !== 'test' && <Jdenticon size={iconSize} value={user.username} />}
      </S.UserDetailsAvatar>
      <S.UserDetailsText>
        <S.UserDetailsUsername>
          { user.username }
        </S.UserDetailsUsername>
        <S.UserDetailsEmail>
          { user.email }
        </S.UserDetailsEmail>
      </S.UserDetailsText>
    </S.UserDetailsWrapper>
  );
}

export default UserDetails;
