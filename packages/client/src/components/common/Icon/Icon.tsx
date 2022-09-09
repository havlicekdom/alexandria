/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { Icon as IconStyled } from './Icon.styled';

function Icon(props: any) {
  return (
    <IconStyled {...props} />
  );
}

export default Icon;
