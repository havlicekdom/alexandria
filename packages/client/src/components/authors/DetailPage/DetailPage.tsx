import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment-mini';
import routes from 'constants/routes';
import { ThemeContext } from 'context/ThemeContext';
import {
  HeadingImage, HeadingInfo, HeadingName, HeadingText, HeadingWrapper,
} from 'components/common/DetailPage/DetailPage.styled';
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
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!authorId) return;

    dispatch(getAuthorsDetail(authorId));
  }, []);

  const renderBooks = () => (
    authorData?.books?.map((book) => (<AuthorBook key={book.id} book={book} />))
  );

  const renderGenres = () => (
    authorData?.genres?.map((genre) => (<Pill key={genre.id} $variant="primary"><Link to={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>))
  );

  return (
    authorData && (
      <>
        <HeadingWrapper>
          <HeadingImage>
            <img src={missingAuthorImage.src} alt={authorData.name} />
          </HeadingImage>
          <HeadingInfo>
            <HeadingName>
              { authorData.name }
            </HeadingName>
            <S.AuthorGenres>
              { renderGenres() }
            </S.AuthorGenres>
            <HeadingText $currentTheme={theme}>
              { `Born ${moment(authorData.dateOfBirth, 'YYYY-MM-DD').toDate().toLocaleDateString()}` }
            </HeadingText>
            <HeadingText $currentTheme={theme}>
              { authorData.bio }
            </HeadingText>
          </HeadingInfo>
        </HeadingWrapper>
        <Container>
          <Panel $portion={1} header="Books">
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
