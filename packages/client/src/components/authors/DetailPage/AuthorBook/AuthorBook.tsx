import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'context/ThemeContext';
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
  const { theme } = useContext(ThemeContext);
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));

  return (
    <ListItem data-testid="book">
      <ListItemImage>
        <img src={missingBookImage} alt="" />
      </ListItemImage>
      <ListItemContentWrapper>
        <S.AuthorBookName currentTheme={theme}>
          <Link to={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </S.AuthorBookName>
        <S.AuthorBookPills currentTheme={theme}>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.AuthorBookPills>
        <ListItemContent currentTheme={theme}>
          { book.description }
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default AuthorBook;
