import React from 'react';

import * as S from './List.styled';

type Props = {
  children: React.ReactNode;
};

function List({ children }: Props) {
  return (
    <S.List>
      { children }
    </S.List>
  );
}

export default List;
