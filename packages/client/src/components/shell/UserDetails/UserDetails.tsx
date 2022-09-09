import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faCaretRight, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Icon from 'components/common/Icon';
import { useAppSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/auth/authSlice';
import { selectUser } from 'store/user/userSlice';
import UserMenu from './UserMenu';

import * as S from './UserDetails.styled';

function UserDetails() {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <S.UserDetailsWrapper>
      {isLoggedIn
        ? (
          <>
            <S.UserDetailsButton
              variant="link"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              { `Hi, ${user.username}!` }
              <S.UserDetailsIcon icon={faCaretRight} />
            </S.UserDetailsButton>
            {isDropdownOpen && <UserMenu />}
          </>
        ) : (
          <Link to="/login">
            <Icon icon={faArrowRightToBracket} />
            Login
          </Link>
        )}
    </S.UserDetailsWrapper>
  );
}

export default UserDetails;
