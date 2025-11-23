
"use client";

import routes from 'constants/routes';

import * as S from './NotFound.styled';
import { useRouter } from 'next/navigation';

function NotFound() {
  const router = useRouter();

  const onButtonClick = () => {
    router.replace(routes.overview);
  };

  return (
    <S.NotFoundWrapper>
      <S.NotFoundCode>
        404
      </S.NotFoundCode>
      <S.NotFoundHeader>
        Page not found
      </S.NotFoundHeader>
      <S.NotFoundContent>
        It looks like the content you&apos;re looking for is somewhere else...
      </S.NotFoundContent>
      <S.NotFoundContent>
        <S.NotFoundButton data-testid="home-button" variant="primary" onClick={onButtonClick}>
          Take me home
        </S.NotFoundButton>
      </S.NotFoundContent>
    </S.NotFoundWrapper>
  );
}

export default NotFound;
