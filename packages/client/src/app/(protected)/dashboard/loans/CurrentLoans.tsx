'use client';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import Loan from './Loan';
import type { Loan as ILoan } from 'types/loan';
import { useLoanModal } from './useLoanModal';

type Props = {
  loans: ILoan[];
};

export default function CurrentLoans({ loans }: Props) {
  const { openLoanModal } = useLoanModal();

  const renderLoans = () => loans.map((loan) => (<Loan loan={loan} key={loan.id} />));

  const renderNoLoanMessage = () => (
    <>
      <div className="mb-4">You currently have no loans.</div>

      <Button variant="primary" onClick={openLoanModal} data-testid="loan-button">
        <Icon icon={faPlusCircle} />
        Loan a book
      </Button>
    </>
  );

  return (
    <Panel header="Your loans" portion={2}>
      <List>
        { loans.length > 0 ? renderLoans() : renderNoLoanMessage() }
      </List>
    </Panel>
  );
}
