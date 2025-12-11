import documentTitle from "utils/documentTitle";
import { Metadata } from "next";
import Container from "components/common/Container";
import AuthorsList from "./AuthorsList";
import { fetchApi } from "utils/fetch";
import API from 'constants/api';

export const metadata: Metadata = {
  title: documentTitle("Authors"),
};

export default async function AuthorsPage() {
  const authors = await fetchApi(API.authors.list, 'GET');

  return (
    <Container>
      <AuthorsList authors={authors} />
    </Container>
  );
}
