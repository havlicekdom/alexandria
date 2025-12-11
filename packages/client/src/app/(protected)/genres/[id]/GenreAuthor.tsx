import routes from 'constants/routes';
import ListItem from 'components/common/ListItem';
import { Author } from 'types/author';

import missingAuthorImage from 'assets/images/missing-author-image.jpeg';
import Link from 'next/link';

type Props = {
  author: Author;
};

function GenreAuthor({ author }: Props) {
  return (
    <ListItem>
      <div className="mr-8">
        <img src={missingAuthorImage.src} alt={author.name} className="w-[60px] h-auto" />
      </div>
      <div>
        <div className="text-text mb-4 font-bold">
          <Link href={routes.authorsDetail(author.id)}>
            { author.name }
          </Link>
        </div>
        <div className="text-text text-ellipsis line-clamp-3">
          { author.bio }
        </div>
      </div>
    </ListItem>
  );
}

export default GenreAuthor;
