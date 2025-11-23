

import * as S from './Container.styled';

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <S.Container>
      { children }
    </S.Container>
  );
}

export default Container;
