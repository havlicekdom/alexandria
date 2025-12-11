import Link from "next/link";
import moment from "moment-mini";
import routes from "constants/routes";
import { Author as AuthorType } from "types/author";

import missingAuthorImage from "assets/images/missing-author-image.jpeg";

import ListItem from "components/common/ListItem";

type Props = {
  author: AuthorType;
};

export default function Author({ author }: Props) {
  return (
    <ListItem data-testid="author">
      <div className="mr-8">
        <img src={missingAuthorImage.src} alt="" className="w-[60px] h-auto" />
      </div>
      <div>
        <Link href={routes.authorsDetail(author.id)}>
          <div className="font-bold mb-4">{author.name}</div>
        </Link>
        <div className="text-text text-ellipsis line-clamp-3">
          <div className="mb-4">
            {`Born ${moment(author.dateOfBirth, "YYYY-MM-DD")
              .toDate()
              .toLocaleDateString()}`}
          </div>
          <div>{author.bio}</div>
        </div>
      </div>
    </ListItem>
  );
}
