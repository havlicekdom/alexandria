import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment-mini';
import Container from 'components/common/Container';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import Pill from 'components/common/Pill';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { getAuthorsDetail, selectAuthorsDetail } from 'store/authors/authorsSlice';
import missingAuthorImage from 'assets/images/missing-author-image.jpeg';
import AuthorBook from './AuthorBook';

import * as S from './DetailPage.styled';

function DetailPage() {
  const { authorId } = useParams();
  const dispatch = useAppDispatch();
  const authorData = useAppSelector(selectAuthorsDetail);

  useEffect(() => {
    if (!authorId) return;

    dispatch(getAuthorsDetail(authorId));
  }, []);

  const renderBooks = () => (
    authorData?.books?.map((book) => (<AuthorBook key={book.id} book={book} />))
  );

  const renderGenres = () => (
    authorData?.genres?.map((genre) => (<Pill key={genre.id} variant="primary">{ genre.name }</Pill>))
  );

  return (
    authorData && (
      <>
        <S.AuthorWrapper>
          <S.AuthorImage>
            <img src={missingAuthorImage} alt={authorData.name} />
          </S.AuthorImage>
          <S.AuthorInfo>
            <S.AuthorName>
              { authorData.name }
            </S.AuthorName>
            <S.AuthorGenres>
              { renderGenres() }
            </S.AuthorGenres>
            <S.AuthorBirthDate>
              { `Born ${moment(authorData.dateOfBirth, 'YYYY-MM-DD').toDate().toLocaleDateString()}` }
            </S.AuthorBirthDate>
            <S.AuthorBio>
              { authorData.bio }
            </S.AuthorBio>
          </S.AuthorInfo>
        </S.AuthorWrapper>
        <Container>
          <Panel portion={1} header="Books">
            <List>
              { renderBooks() }
            </List>
          </Panel>
        </Container>
      </>
    )
  );
}

export default DetailPage;
