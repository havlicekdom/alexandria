import React, { useState } from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useDocumentTitle from 'hooks/useDocumentTitle';
import CurrentLoans from 'components/overview/CurrentLoans';
import Container from 'components/common/Container';
import LatestBooks from 'components/overview/LatestBooks';
import FloatingButton from 'components/common/FloatingButton';
import Icon from 'components/common/Icon';
import LoanModal from 'components/overview/LoanModal';

function Overview() {
  useDocumentTitle('Overview');
  const [loanModalOpen, setLoanModalOpen] = useState(false);

  return (
    <Container>
      <CurrentLoans />
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
