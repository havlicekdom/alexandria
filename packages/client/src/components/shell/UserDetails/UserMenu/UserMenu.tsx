import React from 'react';
import { Link } from 'react-router-dom';
import { faCog, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { logout } from 'store/auth/authSlice';
import { selectUser } from 'store/user/userSlice';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import * as S from './UserMenu.styled';

function UserMenu() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <S.UserMenuWrapper>
      <S.UserMenu>
        <S.UserMenuHeader>
          <S.UserMenuHeaderName>
            { user.username }
          </S.UserMenuHeaderName>
          <S.UserMenuHeaderEmail>
            { user.email }
          </S.UserMenuHeaderEmail>
        </S.UserMenuHeader>
        <S.UserMenuItem>
          <Link to="/settings">
            <Icon icon={faCog} />
            Settings
          </Link>
        </S.UserMenuItem>
        <S.UserMenuItem>
          <Button
            variant="link"
            onClick={() => dispatch(logout())}
          >
            <Icon icon={faArrowRightFromBracket} />
            Logout
          </Button>
        </S.UserMenuItem>
      </S.UserMenu>
    </S.UserMenuWrapper>
  );
}

export default UserMenu;
