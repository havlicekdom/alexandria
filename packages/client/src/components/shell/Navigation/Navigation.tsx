import React from 'react';
import {
  faClipboardList,
  faUserPen,
  faBook,
  faRectangleList,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import routes from 'constants/routes';
import Icon from 'components/common/Icon';
import UserMenu from '../UserMenu';

import * as S from './Navigation.styled';

function Navigation() {
  return (
    <S.NavigationWrapper>
      <S.Logo>
        <Icon icon={faBookOpen} />
        Alexandria
      </S.Logo>
      <S.Navigation>
        <S.NavigationItem>
          <S.NavigationLink to={routes.overview}>
            <Icon icon={faClipboardList} />
            Overview
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to={routes.authors}>
            <Icon icon={faUserPen} />
            Authors
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to={routes.books}>
            <Icon icon={faBook} />
            Books
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to={routes.genres}>
            <Icon icon={faRectangleList} />
            Genres
          </S.NavigationLink>
        </S.NavigationItem>
      </S.Navigation>
      <UserMenu />
    </S.NavigationWrapper>
  );
}

export default Navigation;
