
import useDocumentTitle from 'hooks/useDocumentTitle';
import Container from 'components/common/Container';
import GenresList from './GenresList';

function Genres() {
  useDocumentTitle('Genres');

  return (
    <Container>
      <GenresList />
    </Container>
  );
}

export default Genres;
