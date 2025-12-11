import Panel from "components/common/Panel";
import List from "components/common/List";
import Author from "./Author";
import type { Author as AuthorType } from "types/author";

type Props = {
  authors: AuthorType[];
};

function AuthorsList({ authors }: Props) {
  const renderAuthors = () =>
    authors.map((author) => <Author author={author} key={author.id} />);

  return (
    <Panel portion={2}>
      <List>{renderAuthors()}</List>
    </Panel>
  );
}

export default AuthorsList;
