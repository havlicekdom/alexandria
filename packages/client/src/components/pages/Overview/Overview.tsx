import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import CurrentLoans from 'components/overview/CurrentLoans';
import Container from 'components/common/Container';
import LatestBooks from 'components/overview/LatestBooks';

function Overview() {
  useDocumentTitle('Overview');

  return (
    <Container>
      <CurrentLoans />
      <LatestBooks />
    </Container>
  );
}

export default Overview;
