import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pill from 'components/common/Pill';
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

  const renderGenres = () => book?.genres.map((genre) => (<Pill variant="primary" key={genre.id}>{genre.name}</Pill>));

  return (
    book && (
      <S.BookWrapper>
        <S.BookImage>
          <img src={missingBookImage} alt={book.name} />
        </S.BookImage>
        <S.BookInfo>
          <S.BookName>
            { book.name }
          </S.BookName>
          <S.BookAuthor>
            <Link to={`/authors/${book.author.id}`}>
              { book.author.name }
            </Link>
          </S.BookAuthor>
          <S.BookGenres>
            <Pill>{ book.releaseYear }</Pill>
            { renderGenres() }
          </S.BookGenres>
          <S.BookDescription>
            { book.description }
          </S.BookDescription>
        </S.BookInfo>
      </S.BookWrapper>
    )
  );
}

export default DetailPage;
