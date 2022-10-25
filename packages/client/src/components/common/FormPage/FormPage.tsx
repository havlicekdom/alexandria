import React from 'react';
import { Outlet } from 'react-router-dom';

import * as S from './FormPage.styled';

function FormPage() {
  return (
    <S.FormPageWrapper>
      <Outlet />
    </S.FormPageWrapper>
  );
}

export default FormPage;
