import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from 'context/ThemeContext';
import {
  HeadingInfo, HeadingName, HeadingText, HeadingWrapper,
} from 'components/common/DetailPage/DetailPage.styled';
import Container from 'components/common/Container';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { getGenresDetail, selectGenresDetail } from 'store/genres/genresSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import GenreBook from './GenreBook';
import GenreAuthor from './GenreAuthor';

function DetailPage() {
  const { genreId } = useParams();
  const dispatch = useAppDispatch();
  const genre = useAppSelector(selectGenresDetail);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!genreId) return;

    dispatch(getGenresDetail(genreId));
  }, []);

  const renderBooks = () => (genre?.books.map((book) => <GenreBook book={book} key={book.id} />));

  const renderAuthors = () => (
    genre?.authors.map((author) => <GenreAuthor author={author} key={author.id} />)
  );

  return (
    genre && (
      <>
        <HeadingWrapper>
          <HeadingInfo>
            <HeadingName>
              { genre.name }
            </HeadingName>
            <HeadingText $currentTheme={theme}>
              { genre.bio }
            </HeadingText>
          </HeadingInfo>
        </HeadingWrapper>
        <Container>
          <Panel $portion={2} header="Books">
            <List>
              { renderBooks() }
            </List>
          </Panel>
          <Panel $portion={2} header="Authors">
            <List>
              { renderAuthors() }
            </List>
          </Panel>
        </Container>
      </>
    )
  );
}

export default DetailPage;
