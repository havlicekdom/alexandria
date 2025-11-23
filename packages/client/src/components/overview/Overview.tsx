import { useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useDocumentTitle from 'hooks/useDocumentTitle';
import Container from 'components/common/Container';
import FloatingButton from 'components/common/FloatingButton';
import Icon from 'components/common/Icon';
import CurrentLoans from './CurrentLoans';
import LatestBooks from './LatestBooks';
import LoanModal from './LoanModal';

function Overview() {
  useDocumentTitle('Overview');
  const [loanModalOpen, setLoanModalOpen] = useState(false);

  return (
    <Container>
      <CurrentLoans openLoanModal={() => setLoanModalOpen(true)} />
      <LatestBooks />
      <FloatingButton onClick={() => setLoanModalOpen(!loanModalOpen)} large>
        <Icon icon={faPlusCircle} />
        Loan a book
      </FloatingButton>
      {loanModalOpen && (
        <LoanModal close={() => setLoanModalOpen(false)} />
      )}
    </Container>
  );
}

export default Overview;
