import { Book } from "types/book";
import { fetchApi } from "utils/fetch";
import API from "constants/api";
import Pill from "components/common/Pill";
import Link from "next/link";
import routes from "constants/routes";
import documentTitle from "utils/documentTitle";
import { Metadata } from "next";

import missingBookImage from 'assets/images/missing-book-image.jpeg';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const book = await fetchApi<Book>(API.books.detail(id), "GET");

  return {
    title: documentTitle(book.name),
  };
}

export default async function BooksDetailPage({ params }: Props) {
  const { id } = await params;
  const book = await fetchApi<Book>(API.books.detail(id), "GET");

  const renderGenres = () =>
    book.genres.map((genre) => (
      <Pill variant="primary" key={genre.id}>
        <Link href={routes.genresDetail(genre.id)}>{genre.name}</Link>
      </Pill>
    ));

  return (
      <div className="detail-page__heading__wrapper">
        <div className="detail-page__heading__image">
          <img src={missingBookImage.src} alt={book.name} />
        </div>
      <div>
        <h1 className="detail-page__heading__name">{book.name}</h1>
        <h3>
          <Link href={routes.authorsDetail(book.author.id)}>
            {book.author.name}
          </Link>
        </h3>
        <div className="mb-4">
          <Pill>{book.releaseYear}</Pill>
          {renderGenres()}
        </div>
        <div className="detail-page__heading__text">{book.description}</div>
      </div>
    </div>
  );
}
