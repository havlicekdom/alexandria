
import useDocumentTitle from 'hooks/useDocumentTitle';
import Container from 'components/common/Container';
import AuthorsList from './AuthorsList';

function Authors() {
  useDocumentTitle('Authors');

  return (
    <Container>
      <AuthorsList />
    </Container>
  );
}

export default Authors;
