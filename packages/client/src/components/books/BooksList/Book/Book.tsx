import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import {
  ListItemContent, ListItemContentWrapper, ListItemImage,
} from 'components/common/List/ListItem/ListItem.styled';
import Pill from 'components/common/Pill';
import { Book as BookType, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

import * as S from './Book.styled';

type Props = {
  book: BookType;
}

function Book({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));

  return (
    <ListItem data-testid="book">
      <ListItemImage>
        <img src={missingBookImage} alt="" />
      </ListItemImage>
      <ListItemContentWrapper>
        <Link to={routes.booksDetail(book.id)}>
          <S.BookName>
            { book.name }
          </S.BookName>
        </Link>
        <S.BookAuthor>
          <Link to={routes.authorsDetail(book.author.id)}>
            { book.author.name }
          </Link>
        </S.BookAuthor>
        <S.BookPills>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.BookPills>
        <ListItemContent>
          { book.description }
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default Book;
