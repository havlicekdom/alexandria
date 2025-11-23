
import { Outlet } from 'react-router-dom';
import { SubmitSuccessfulProvider } from 'context/SubmitSuccessfulContext';

import * as S from './FormPage.styled';

function FormPage() {
  return (
    <S.FormPageWrapper>
      <SubmitSuccessfulProvider>
        <Outlet />
      </SubmitSuccessfulProvider>
    </S.FormPageWrapper>
  );
}

export default FormPage;
