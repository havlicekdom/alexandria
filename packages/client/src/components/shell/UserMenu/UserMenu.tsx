import React from 'react';
import { Link } from 'react-router-dom';
import { faCog, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/auth/authSlice';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import * as S from './UserMenu.styled';

function UserMenu() {
  const dispatch = useAppDispatch();

  return (
    <S.UserMenuWrapper>
      <S.UserMenu>
        <S.UserMenuItem>
          <S.UserMenuLink to="/settings">
            <Icon icon={faCog} />
            Settings
          </S.UserMenuLink>
        </S.UserMenuItem>
        <S.UserMenuItem>
          <Button
            variant="link"
            onClick={() => dispatch(logout())}
          >
            <Icon icon={faArrowRightFromBracket} />
            Log out
          </Button>
        </S.UserMenuItem>
      </S.UserMenu>
    </S.UserMenuWrapper>
  );
}

export default UserMenu;
