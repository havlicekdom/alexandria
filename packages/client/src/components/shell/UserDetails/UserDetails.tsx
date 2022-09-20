import React from 'react';

import { useAppSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/auth/authSlice';
import { selectUser } from 'store/user/userSlice';

import * as S from './UserDetails.styled';

function UserDetails() {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <S.UserDetailsWrapper>
      {isLoggedIn
        ? (
          <S.UserDetailsButton
            variant="link"
            onClick={() => null}
          >
            { user.username }
          </S.UserDetailsButton>
        ) : ''}
    </S.UserDetailsWrapper>
  );
}

export default UserDetails;
