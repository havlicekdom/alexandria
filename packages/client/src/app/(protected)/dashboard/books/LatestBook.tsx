import Link from 'next/link';
import routes from 'constants/routes';
import ListItem from 'components/common/ListItem';
import Pill from 'components/common/Pill';
import { Book, BookFormat } from 'types/book';
import { Genre } from 'types/genre';

import missingBookImage from 'assets/images/missing-book-image.jpeg';

type Props = {
  book: Book;
}

export default function LatestBook({ book }: Props) {
  const renderGenres = (genres: Genre[]) => genres.map((genre) => (<Pill variant="primary" key={genre.id}><Link href={routes.genresDetail(genre.id)}>{ genre.name }</Link></Pill>));

  return (
    <ListItem data-testid="book">
      <div className="mr-4">
        <img src={missingBookImage.src} alt="" className="w-[60px] h-auto" />
      </div>
      <div>
        <div className="text-text mb-4 brightness-90 font-bold">
          <Link href={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </div>
        <div className="text-text mb-4 brightness-90">
          <Link href={routes.authorsDetail(book.author.id)}>
            { book.author.name }
          </Link>
        </div>
        <div className="text-text mb-4 brightness-90">
          <Pill>{ book.releaseYear }</Pill>
          <Pill>{ BookFormat[book.format] }</Pill>
          { renderGenres(book.genres) }
        </div>
        <div className="text-text mb-4 brightness-90 text-ellipsis line-clamp-3">
          { book.description }
        </div>
      </div>
    </ListItem>
  );
}
