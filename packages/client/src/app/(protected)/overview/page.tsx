import Container from 'components/common/Container';
import CurrentLoans from './loans/CurrentLoans';
import LatestBooks from './books/LatestBooks';
import { Loan } from 'types/loan';
import { fetchApi } from 'utils/fetch';
import API from 'constants/api';
import { Book } from 'types/book';
import { LoanABook } from './loans/LoanABook';
import LoanModal from './loans/LoanModal';
import { User } from 'types/user';
import { LoanModalProvider } from './loans/useLoanModal';
import { Metadata } from 'next';
import documentTitle from 'utils/documentTitle';

export const metadata: Metadata = {
  title: documentTitle("Overview"),
};

async function Overview() {
  const loans = await fetchApi(API.user.loans, 'GET') as Loan[];
  const latestBooks = await fetchApi(API.books.latest, 'GET') as Book[];
  const user = await fetchApi(API.user.profile, 'GET') as User;
  const loanableBooks = await fetchApi(API.books.loanable, 'GET') as Book[];


  return (
    <Container>
      <LoanModalProvider>
        <CurrentLoans loans={loans} />
        <LatestBooks latestBooks={latestBooks} />
        <LoanModal user={user} loanableBooks={loanableBooks} />
        <LoanABook />
      </LoanModalProvider>
    </Container>
  );
}

export default Overview;
