import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import Container from 'components/common/Container';
import BooksList from './BooksList';

function Books() {
  useDocumentTitle('Books');

  return (
    <Container>
      <BooksList />
    </Container>
  );
}

export default Books;
