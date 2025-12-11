import { fetchApi } from "utils/fetch";
import API from 'constants/api';
import Container from "components/common/Container";
import { Metadata } from "next";
import documentTitle from "utils/documentTitle";
import GenreList from "app/(protected)/genres/GenreList";
import { Genre } from "types/genre";

export const metadata: Metadata = {
  title: documentTitle('Genres'),
}

export default async function GenrePage() {
  const genres = await fetchApi<Genre[]>(API.genres.list, 'GET');

  return (
    <Container>
      <GenreList genres={genres} />
    </Container>
  );
}
