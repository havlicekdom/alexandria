import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-mini';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/common/Icon';
import ListItem from 'components/common/List/ListItem';
import { Loan as ILoan } from 'types/loan';

import * as S from './Loan.styled';

type Props = {
  loan: ILoan;
};

function Loan({ loan }: Props) {
  const dateEndMoment = moment(loan.dateEnd);
  const endsIn = moment.duration(dateEndMoment.diff(moment()));
  const isOverdue = endsIn.asDays() < 0;

  return (
    <ListItem>
      <S.LoanIcon>
        <Icon icon={faReceipt} />
      </S.LoanIcon>
      <S.LoanContent>
        <Link to={`/books/${loan.book.id}`}>
          <S.LoanBookName>
            { loan.book.name }
          </S.LoanBookName>
        </Link>
        <S.LoanBookDescription>
          <S.LoanBookDescriptionItem>
            { loan.book.author.name }
          </S.LoanBookDescriptionItem>
          <S.LoanBookDescriptionEndsIn isOverdue={isOverdue}>
            {
            isOverdue
              ? `Overdue ${Math.floor(Math.abs(endsIn.asDays()))} days`
              : `Ends in ${Math.floor(endsIn.asDays())} days`
            }
          </S.LoanBookDescriptionEndsIn>
        </S.LoanBookDescription>
      </S.LoanContent>
    </ListItem>
  );
}

export default Loan;
