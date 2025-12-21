'use client';

import Button from 'components/common/Button';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  large?: boolean;
}

export default function FloatingButton({ onClick, children, large = false }: Props) {
  return (
    <Button onClick={onClick} variant="primary" className={`fixed bottom-4 right-4 z-10 ${large ? 'text-xl' : ''}`}>
      { children }
    </Button>
  );
}
