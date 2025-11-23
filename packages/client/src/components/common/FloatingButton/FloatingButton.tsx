

import * as S from './FloatingButton.styled';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  large?: boolean;
}

function FloatingButton({ onClick, children, large }: Props) {
  return (
    <S.FloatingButton onClick={onClick} variant="primary" large={large}>
      { children }
    </S.FloatingButton>
  );
}

FloatingButton.defaultProps = {
  large: false,
};

export default FloatingButton;
