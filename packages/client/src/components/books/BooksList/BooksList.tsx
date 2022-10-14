import React, { useEffect } from 'react';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { getBooksList, selectBooksList } from 'store/books/booksSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Book from './Book';

function BooksList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooksList);

  useEffect(() => {
    dispatch(getBooksList(null));
  }, []);

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
