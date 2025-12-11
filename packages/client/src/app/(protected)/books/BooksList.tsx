import List from 'components/common/List';
import Panel from 'components/common/Panel';
import Book from './Book';
import { Book as BookType } from 'types/book';

type Props = {
  books: BookType[];
}

function BooksList({ books }: Props) {
  const renderBooks = () => books.map((book) => (<Book book={book} key={book.id} />));

  return (
    <Panel portion={2}>
      <List>
        { renderBooks() }
      </List>
    </Panel>
  );
}

export default BooksList;
