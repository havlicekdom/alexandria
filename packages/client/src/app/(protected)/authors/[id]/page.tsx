import { fetchApi } from "utils/fetch";
import API from "constants/api";
import moment from "moment-mini";
import routes from "constants/routes";
import Container from "components/common/Container";
import List from "components/common/List";
import Panel from "components/common/Panel";
import Pill from "components/common/Pill";
import missingAuthorImage from "assets/images/missing-author-image.jpeg";
import AuthorBook from "./AuthorBook";

import Link from "next/link";
import { Author } from "types/author";
import { Metadata } from "next";
import documentTitle from "utils/documentTitle";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const author = await fetchApi<Author>(API.authors.detail(id), "GET");

  return {
    title: documentTitle(author.name),
  };
}

export default async function AuthorDetailPage({ params }: Props) {
  const { id } = await params;
  const author = await fetchApi<Author>(API.authors.detail(id), "GET");

  const renderBooks = () =>
    author.books.map((book) => <AuthorBook key={book.id} book={book} />);

  const renderGenres = () =>
    author.genres.map((genre) => (
      <Pill key={genre.id} variant="primary">
        <Link href={routes.genresDetail(genre.id)}>{genre.name}</Link>
      </Pill>
    ));

  return (
    <>
      <div className="detail-page__heading__wrapper">
        <div className="detail-page__heading__image">
          <img src={missingAuthorImage.src} alt={author.name} />
        </div>
        <div>
          <h1 className="detail-page__heading__name">{author.name}</h1>
          <div className="mb-8">{renderGenres()}</div>
          <div className="detail-page__heading__text">
            {`Born ${moment(author.dateOfBirth, "YYYY-MM-DD")
              .toDate()
              .toLocaleDateString()}`}
          </div>
          <div className="detail-page__heading__text">{author.bio}</div>
        </div>
      </div>
      <Container>
        <Panel portion={1} header="Books">
          <List>{renderBooks()}</List>
        </Panel>
      </Container>
    </>
  );
}
