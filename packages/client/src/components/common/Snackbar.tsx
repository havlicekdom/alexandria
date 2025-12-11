"use client";

import { BaseHTMLAttributes, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/common/Button';

export interface SnackbarProps extends BaseHTMLAttributes<HTMLDivElement> {
  variant: 'error' | 'success' | 'info' | 'default';
  autoHide?: number;
}

function Snackbar({ variant, autoHide = 3000, children }: SnackbarProps) {
  const [show, setShow] = useState(true);

  const $animationLength = 200;

  let hideTimer: NodeJS.Timeout;
  let animationTimer: NodeJS.Timeout;

  useEffect(() => {
    animationTimer = setTimeout(() => {
      setShow(false);
    }, autoHide);

    hideTimer = setTimeout(() => {
    }, autoHide + ($animationLength * 2));
    // the delay needs to be bigger than the length to prevent clipping

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);

    hideTimer = setTimeout(() => {
    }, $animationLength);

    clearTimeout(hideTimer);
  };

  const classes = 'fixed bottom-15 right-15 p-8';
  const variants = {
    error: 'bg-error',
    success: 'bg-success',
    info: 'bg-info',
    default: 'bg-secondary-bg',
  };

  // TODO: Solve animations
  return (
    <div className={`${classes} ${variants[variant]}`}>
      { children }
      <Button variant="link" onClick={handleClose} className="absolute top-8 right-8">
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  );
}

Snackbar.defaultProps = {
  autoHide: 3000,
};

export default Snackbar;
