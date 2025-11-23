"use client";

import { ReactNode } from 'react';
import { SubmitSuccessfulProvider } from 'context/SubmitSuccessfulContext';

import * as S from 'components/common/FormPage/FormPage.styled';

export default function FormLayout({ children }: { children: ReactNode }) {
  return (
    <S.FormPageWrapper>
      <SubmitSuccessfulProvider>
        { children }
      </SubmitSuccessfulProvider>
    </S.FormPageWrapper>
  );
}
