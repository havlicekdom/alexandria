import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from 'store/hooks';
import { clearMessage } from 'store/shared/sharedSlice';

import * as S from './Snackbar.styled';

export interface SnackbarProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  variant: 'error' | 'success' | 'info' | 'default';
  autoHide?: number;
}

function Snackbar({ variant, autoHide = 3000, children }: SnackbarProps) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);

  const animationLength = 200;

  let hideTimer: NodeJS.Timeout;
  let animationTimer: NodeJS.Timeout;

  useEffect(() => {
    animationTimer = setTimeout(() => {
      setShow(false);
    }, autoHide);

    hideTimer = setTimeout(() => {
      dispatch(clearMessage());
    }, autoHide + (animationLength * 2));
    // the delay needs to be bigger than the length to prevent clipping

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);

    hideTimer = setTimeout(() => {
      dispatch(clearMessage());
    }, animationLength);

    clearTimeout(hideTimer);
  };

  return (
    <CSSTransition
      classNames="snackbar"
      in={show}
      appear
      enter={false}
      timeout={animationLength}
    >
      <S.SnackbarWrapper variant={variant} animationLength={animationLength}>
        { children }
        <S.SnackbarClose variant="link" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </S.SnackbarClose>
      </S.SnackbarWrapper>
    </CSSTransition>
  );
}

Snackbar.defaultProps = {
  autoHide: 3000,
};

export default Snackbar;
