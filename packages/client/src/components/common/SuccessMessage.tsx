
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import Icon from './Icon';

type Props = {
  children: React.ReactNode;
};

function SuccessMessage({ children }: Props) {
  return (
    <div className="flex flex-col gap-8 items-center p-8 bg-success rounded-md">
      <div className="text-9xl">
        <Icon icon={faCheckCircle} />
      </div>
      <div className="text-center">
        { children }
      </div>
    </div>
  );
}

export default SuccessMessage;
