import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from 'components/common/List/ListItem';
import Pill from 'components/common/Pill';
import { Book as BookType, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

import * as S from './Book.styled';

type Props = {
  book: BookType;
}

function Book({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}>{ genre.name }</Pill>));

  return (
    <ListItem data-testid="book">
      <S.BookImage>
        <img src={missingBookImage} alt="" />
      </S.BookImage>
      <S.BookContent>
        <Link to={`/books/${book.id}`}>
          <S.BookName>
            { book.name }
          </S.BookName>
        </Link>
        <S.BookAuthor>
          <Link to={`/authors/${book.author.id}`}>
            { book.author.name }
          </Link>
        </S.BookAuthor>
        <S.BookPills>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.BookPills>
        <S.BookDescription>
          { book.description }
        </S.BookDescription>
      </S.BookContent>
    </ListItem>
  );
}

export default Book;
