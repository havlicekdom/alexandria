import List from 'components/common/List';
import Panel from 'components/common/Panel';
import LatestBook from './LatestBook';
import { Book } from 'types/book';

function LatestBooks({ latestBooks }: { latestBooks: Book[] }) {
  const renderLatestBooks = () => (
    latestBooks.map((book) => (<LatestBook book={book} key={book.id} />))
  );

  return (
    <Panel header="Recently added books" portion={2}>
      <List>
        { renderLatestBooks() }
      </List>
    </Panel>
  );
}

export default LatestBooks;
