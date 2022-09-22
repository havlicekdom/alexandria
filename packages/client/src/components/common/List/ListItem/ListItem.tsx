import React from 'react';

import * as S from './ListItem.styled';

type Props = {
  children: React.ReactNode;
};

function ListItem({ children }: Props) {
  return (
    <S.ListItem>
      { children }
    </S.ListItem>
  );
}

export default ListItem;
