import React from 'react';
import { Link } from 'react-router-dom';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/common/Icon';
import ListItem from 'components/common/List/ListItem';
import Pill from 'components/common/Pill';
import { Book, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import * as S from './LatestBook.styled';

type Props = {
  book: Book;
}

function LatestBook({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary">{ genre.name }</Pill>));

  return (
    <ListItem>
      <S.LatestBookIcon>
        <Icon icon={faBook} />
      </S.LatestBookIcon>
      <S.LatestBookContent>
        <S.LatestBookName>
          <Link to={`/books/${book.id}`}>
            { book.name }
          </Link>
        </S.LatestBookName>
        <S.LatestBookAuthor>
          <Link to={`/authors/${book.author.id}`}>
            { book.author.name }
          </Link>
        </S.LatestBookAuthor>
        <S.LatestBookPills>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.LatestBookPills>
        <S.LatestBookDescription>
          { book.description }
        </S.LatestBookDescription>
      </S.LatestBookContent>
    </ListItem>
  );
}

export default LatestBook;
