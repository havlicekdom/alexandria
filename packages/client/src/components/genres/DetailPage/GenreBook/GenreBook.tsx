import React from 'react';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import {
  ListItemContent, ListItemContentWrapper, ListItemImage, ListItemName,
} from 'components/common/List/ListItem/ListItem.styled';
import { Link } from 'react-router-dom';
import { Book } from 'types/book';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

type Props = {
  book: Book;
};

function GenreBook({ book }: Props) {
  return (
    <ListItem>
      <ListItemImage>
        <img src={missingBookImage} alt={book.name} />
      </ListItemImage>
      <ListItemContentWrapper>
        <ListItemName>
          <Link to={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </ListItemName>
        <ListItemContent>
          { book.description }
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default GenreBook;
