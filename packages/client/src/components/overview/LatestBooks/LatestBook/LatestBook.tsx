import { useContext } from 'react';
import Link from 'next/link';
import routes from 'constants/routes';
import { ThemeContext } from 'context/ThemeContext';
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
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill $variant="primary" key={genre.id}><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));
  const { theme } = useContext(ThemeContext);

  return (
    <ListItem data-testid="book">
      <S.LatestBookImage>
        <img src={missingBookImage.src} alt="" />
      </S.LatestBookImage>
      <S.LatestBookContent>
        <S.LatestBookName $currentTheme={theme}>
          <Link href={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </S.LatestBookName>
        <S.LatestBookAuthor $currentTheme={theme}>
          <Link href={routes.authorsDetail(book.author.id)}>
            { book.author.name }
          </Link>
        </S.LatestBookAuthor>
        <S.LatestBookPills $currentTheme={theme}>
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </S.LatestBookPills>
        <S.LatestBookDescription $currentTheme={theme}>
          { book.description }
        </S.LatestBookDescription>
      </S.LatestBookContent>
    </ListItem>
  );
}

export default LatestBook;
