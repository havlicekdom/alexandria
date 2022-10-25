import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import routes from 'constants/routes';
import Icon from 'components/common/Icon';

import * as S from './NotFound.styled';

function NotFound() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(routes.overview);
  };

  return (
    <S.NotFoundWrapper>
      <Icon icon={faExclamationTriangle} />
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
        <S.NotFoundButton data-testid="home-button" variant="primary" onClick={() => onButtonClick()}>
          Take me home
        </S.NotFoundButton>
      </S.NotFoundContent>
    </S.NotFoundWrapper>
  );
}

export default NotFound;
