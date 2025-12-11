import BooksList from "./BooksList";
import Container from "components/common/Container";
import { Metadata } from "next";
import documentTitle from "utils/documentTitle";
import API from 'constants/api';
import { fetchApi } from "utils/fetch";
import { Book } from "types/book";

export const metadata: Metadata = {
  title: documentTitle('Books'),
}

export default async function BooksPage() {
  const books = await fetchApi<Book[]>(API.books.all, 'GET');

  return (
    <Container>
      <BooksList books={books} />
    </Container>
  );
}
