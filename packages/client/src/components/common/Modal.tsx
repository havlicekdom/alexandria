import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';
import Button from 'components/common/Button';

type Props = {
  children: React.ReactNode;
  close: () => void;
  title?: string;
  size?: 'default' | 'small';
}

function getModalClass(size: 'default' | 'small') {
  switch (size) {
    case 'small':
      return 'flex flex-col p-8 bg-primary-bg text-text relative rounded w-[45%] max-w-[400px] h-[45%] max-h-[300px';
    case 'default':
    default:
      return 'flex flex-col p-8 bg-primary-bg text-text relative rounded w-[60%] max-w-[500px] h-[60%] max-h-[600px]';
  }
}

function Modal({ children, close, title = '', size = 'default' }: Props) {
  const modalClass = getModalClass(size);

  return (
    <div className="fixed z-999 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className={modalClass}>
        <div className="text-xl">
          { title }
          <Button variant="close" onClick={() => close()} data-testid="modal-close" className="absolute top-4 right-4 w-[18px]">
            <Icon icon={faTimes} className="mr-0" />
          </Button>
        </div>
        <div className="mt-4 flex-auto">
          { children }
        </div>
      </div>
      <div className="-z-1 absolute top-0 bottom-0 left-0 right-0 bg-black opacity-70" onClick={() => close()} data-testid="modal-background" />
    </div>
  );
}
export default Modal;
