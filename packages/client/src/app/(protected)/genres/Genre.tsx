import routes from "constants/routes";
import ListItem from "components/common/ListItem";
import { Genre as GenreType } from "types/genre";

import Link from "next/link";

type Props = {
  genre: GenreType;
};

export default function Genre({ genre }: Props) {
  return (
    <ListItem data-testid="genre">
      <div>
        <Link href={routes.genresDetail(genre.id)}>
          <div className="font-bold mb-4">{genre.name}</div>
        </Link>
        <div className="text-text text-ellipsis line-clamp-3">
          <div>{genre.bio}</div>
        </div>
      </div>
    </ListItem>
  );
}
