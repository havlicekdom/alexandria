import React, { useEffect } from 'react';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getLatestBooks, selectLatestBooks } from 'store/books/booksSlice';
import LatestBook from './LatestBook';

function LatestBooks() {
  const dispatch = useAppDispatch();
  const latestBooks = useAppSelector(selectLatestBooks);

  useEffect(() => {
    dispatch(getLatestBooks());
  }, []);

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
