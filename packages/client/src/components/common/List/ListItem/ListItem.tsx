/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import * as S from './ListItem.styled';

type Props = {
  children: React.ReactNode;
};

function ListItem(props: Props) {
  const { children } = props;

  return (
    <S.ListItem {...props}>
      { children }
    </S.ListItem>
  );
}

export default ListItem;
