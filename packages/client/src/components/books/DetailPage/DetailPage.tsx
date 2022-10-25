import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from 'constants/routes';
import Pill from 'components/common/Pill';
import {
  HeadingImage, HeadingInfo, HeadingName, HeadingText, HeadingWrapper,
} from 'components/common/DetailPage/DetailPage.styled';
import { getBooksDetail, selectBooksDetail } from 'store/books/booksSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

import * as S from './DetailPage.styled';

function DetailPage() {
  const { bookId } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBooksDetail);

  useEffect(() => {
    if (!bookId) return;

    dispatch(getBooksDetail(bookId));
  }, []);

  const renderGenres = () => book?.genres.map((genre) => (<Pill variant="primary" key={genre.id}><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));

  return (
    book && (
      <HeadingWrapper>
        <HeadingImage>
          <img src={missingBookImage} alt={book.name} />
        </HeadingImage>
        <HeadingInfo>
          <HeadingName>
            { book.name }
          </HeadingName>
          <S.BookAuthor>
            <Link to={routes.authorsDetail(book.author.id)}>
              { book.author.name }
            </Link>
          </S.BookAuthor>
          <S.BookGenres>
            <Pill>{ book.releaseYear }</Pill>
            { renderGenres() }
          </S.BookGenres>
          <HeadingText>
            { book.description }
          </HeadingText>
        </HeadingInfo>
      </HeadingWrapper>
    )
  );
}

export default DetailPage;
