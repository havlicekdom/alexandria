import React from 'react';
import {
  faClipboardList,
  faSackDollar,
  faCalendar,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';

import Icon from 'components/common/Icon';
import UserDetails from '../UserDetails';

import * as S from './Navigation.styled';

function Navigation() {
  return (
    <S.NavigationWrapper>
      <S.Navigation>
        <S.NavigationItem>
          <S.NavigationLink to="/">
            <Icon icon={faClipboardList} />
            Overview
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to="/budget">
            <Icon icon={faSackDollar} />
            Budget
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to="/scheduler">
            <Icon icon={faCalendar} />
            Scheduler
          </S.NavigationLink>
        </S.NavigationItem>
        <S.NavigationItem>
          <S.NavigationLink to="/reports">
            <Icon icon={faChartSimple} />
            Reports
          </S.NavigationLink>
        </S.NavigationItem>
      </S.Navigation>
      <UserDetails />
    </S.NavigationWrapper>
  );
}

export default Navigation;
