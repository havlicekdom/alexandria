import React, { useEffect } from 'react';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserLoans, selectUserLoans } from 'store/user/userSlice';
import Loan from './Loan';

function CurrentLoans() {
  const dispatch = useAppDispatch();
  const loans = useAppSelector(selectUserLoans);

  useEffect(() => {
    dispatch(getUserLoans());
  }, []);

  const renderLoans = () => loans.map((loan) => (<Loan loan={loan} key={loan.id} />));

  return (
    <Panel header="Your loans" portion={2}>
      <List>
        { renderLoans() }
      </List>
    </Panel>
  );
}

export default CurrentLoans;
