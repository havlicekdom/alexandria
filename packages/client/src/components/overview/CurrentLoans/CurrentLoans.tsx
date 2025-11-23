import { useEffect } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserLoans, selectUserLoans } from 'store/user/userSlice';
import Loan from './Loan';

import * as S from './CurrentLoans.styled';

type Props = {
  openLoanModal: () => void;
};

function CurrentLoans({ openLoanModal }: Props) {
  const dispatch = useAppDispatch();
  const loans = useAppSelector(selectUserLoans);

  useEffect(() => {
    dispatch(getUserLoans(null));
  }, []);

  const renderLoans = () => loans.map((loan) => (<Loan loan={loan} key={loan.id} />));

  const renderNoLoanMessage = () => (
    <>
      <S.NoLoansMessage>You currently have no loans.</S.NoLoansMessage>

      <Button variant="primary" onClick={openLoanModal} data-testid="loan-button">
        <Icon icon={faPlusCircle} />
        Loan a book
      </Button>
    </>
  );

  return (
    <Panel header="Your loans" $portion={2}>
      <List>
        { loans.length > 0 ? renderLoans() : renderNoLoanMessage() }
      </List>
    </Panel>
  );
}

export default CurrentLoans;
