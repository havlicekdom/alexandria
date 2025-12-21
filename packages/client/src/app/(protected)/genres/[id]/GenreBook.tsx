import routes from 'constants/routes';
import ListItem from 'components/common/ListItem';
import { Book } from 'types/book';

import missingBookImage from 'assets/images/missing-book-image.jpeg';
import Link from 'next/link';

type Props = {
  book: Book;
};

export default function GenreBook({ book }: Props) {
  return (
    <ListItem>
      <div className="mr-8">
        <img src={missingBookImage.src} alt={book.name} className="w-[60px] h-auto" />
      </div>
      <div>
        <div className="text-text mb-4 font-bold">
          <Link href={routes.booksDetail(book.id)}>
            { book.name }
          </Link>
        </div>
        <div className="text-text text-ellipsis line-clamp-3">
          { book.description }
        </div>
      </div>
    </ListItem>
  );
}
