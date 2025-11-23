
import UserDetails from '../UserDetails';

import * as S from './TopBar.styled';

function TopBar() {
  return (
    <S.TopBarWrapper>
      <UserDetails />
    </S.TopBarWrapper>
  );
}

export default TopBar;
