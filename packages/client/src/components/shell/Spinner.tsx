import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/common/Icon';

export default function Spinner() {
  return (
    <div className="fixed z-999 top-0 bottom-0 left-0 right-0 bg-background flex items-center justify-center">
      <Icon className="text-5xl animate-spin" icon={faSpinner} />
    </div>
  );
}
