import moment from 'moment-mini';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import routes from 'constants/routes';
import Icon from 'components/common/Icon';
import ListItem from 'components/common/ListItem';
import { Loan as ILoan } from 'types/loan';

import Link from 'next/link';

type Props = {
  loan: ILoan;
};

function Loan({ loan }: Props) {
  const dateEndMoment = moment(loan.dateEnd);
  const endsIn = moment.duration(dateEndMoment.diff(moment()));
  const isOverdue = endsIn.asDays() < 0;

  return (
    <ListItem data-testid="loan">
      <div>
        <Icon icon={faReceipt} className="text-[44px] mr-4" />
      </div>
      <div>
        <Link href={routes.booksDetail(loan.book.id)}>
          <div className="font-bold mb-4">
            { loan.book.name }
          </div>
        </Link>
        <div className="text-text brightness-90">
          <div className="mb-4">
            { loan.book.author.name }
          </div>
          <div className={isOverdue ? 'text-error' : ''}>
            {
            isOverdue
              ? `Overdue ${Math.floor(Math.abs(endsIn.asDays()))} days`
              : `Ends in ${Math.floor(endsIn.asDays())} days`
            }
          </div>
        </div>
      </div>
    </ListItem>
  );
}

export default Loan;
