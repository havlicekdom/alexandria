import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import Pill from 'components/common/Pill';
import { Book, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

import * as S from './LatestBook.styled';

type Props = {
  book: Book;
}

function LatestBook({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));

  return (
    <ListItem data-testid="book">
      <S.LatestBookImage>
        <img src={missingBookImage} alt="" />
      </S.LatestBookImage>
      <S.LatestBookContent>
        <S.LatestBookName>
          <Link to={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </S.LatestBookName>
        <S.LatestBookAuthor>
          <Link to={routes.authorsDetail(book.author.id)}>
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
