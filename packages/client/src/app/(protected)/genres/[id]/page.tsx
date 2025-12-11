import { Genre } from "types/genre";
import { fetchApi } from "utils/fetch";
import API from "constants/api";
import documentTitle from "utils/documentTitle";
import { Metadata } from "next";
import Container from "components/common/Container";
import Panel from "components/common/Panel";
import List from "components/common/List";
import GenreBook from "./GenreBook";
import GenreAuthor from "./GenreAuthor";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const genre = await fetchApi<Genre>(API.genres.detail(id), "GET");

  return {
    title: documentTitle(genre.name),
  };
}

export default async function GenreDetailPage({ params }: Props) {
  const { id } = await params;
  const genre = await fetchApi<Genre>(API.genres.detail(id), "GET");


  const renderBooks = () =>
    genre.books.map((book) => <GenreBook book={book} key={book.id} />);

  const renderAuthors = () =>
    genre.authors.map((author) => (
      <GenreAuthor author={author} key={author.id} />
    ));

  return (
    <>
      <div className="detail-page__heading__wrapper">
        <div>
          <h1 className="detail-page__heading__name">{genre.name}</h1>
          <div className="detail-page__heading__text">{genre.bio}</div>
        </div>
      </div>
      <Container>
        <Panel portion={2} header="Books">
          <List>{renderBooks()}</List>
        </Panel>
        <Panel portion={2} header="Authors">
          <List>{renderAuthors()}</List>
        </Panel>
      </Container>
    </>
  );
}
