import Genre from "./Genre";
import List from "components/common/List";
import Panel from "components/common/Panel";
import { Genre as GenreType } from "types/genre";

type Props = {
  genres: GenreType[];
}

export default function GenreList({ genres }: Props) {
  const renderGenres = () => (genres.map((genre) => (<Genre key={genre.id} genre={genre} />)));

  return (
    <Panel portion={2}>
      <List>
        { renderGenres() }
      </List>
    </Panel>
  );
}
