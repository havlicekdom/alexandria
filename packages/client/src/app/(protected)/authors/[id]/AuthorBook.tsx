import routes from "constants/routes";
import ListItem from "components/common/ListItem";
import Pill from "components/common/Pill";
import { Book, BookFormat } from "types/book";
import { Genre } from "types/genre";

import missingBookImage from "assets/images/missing-book-image.jpeg";
import Link from "next/link";

type Props = {
  book: Book;
};

function AuthorBook({ book }: Props) {
  const renderGenres = (genres: Genre[]) =>
    genres.map((genre) => (
      <Pill variant="primary" key={genre.id}>
        <Link href={routes.genresDetail(genre.id)}>{genre.name}</Link>
      </Pill>
    ));

  return (
    <ListItem data-testid="book">
      <div className="mr-8">
        <img src={missingBookImage.src} alt="" className="w-[60px] h-auto" />
      </div>
      <div>
        <div className="text-text mb-4 font-bold">
          <Link href={routes.booksDetail(book.id)}>{book.name}</Link>
        </div>
        <div className="text-text mb-4 font-bold">
          <Pill>{book.releaseYear}</Pill>
          <Pill>{BookFormat[book.format]}</Pill>
          {renderGenres(book.genres)}
        </div>
        <div className="text-text text-ellipsis line-clamp-3">
          {book.description}
        </div>
      </div>
    </ListItem>
  );
}

export default AuthorBook;
