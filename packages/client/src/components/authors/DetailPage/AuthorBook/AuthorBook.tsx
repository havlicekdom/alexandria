import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import { ListItemContent, ListItemContentWrapper, ListItemImage } from 'components/common/List/ListItem/ListItem.styled';
import Pill from 'components/common/Pill';
import { Book, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

import * as S from './AuthorBook.styled';

type Props = {
  book: Book;
};

function AuthorBook({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}>{ genre.name }</Pill>));

  return (
    <ListItem data-testid="book">
      <ListItemImage>
        <img src={missingBookImage} alt="" />
      </ListItemImage>
      <ListItemContentWrapper>
        <S.AuthorBookName>
          <Link to={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </S.AuthorBookName>
        <S.AuthorBookPills>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.AuthorBookPills>
        <ListItemContent>
          { book.description }
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default AuthorBook;
