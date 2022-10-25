import React from 'react';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import {
  ListItemContent, ListItemContentWrapper, ListItemImage, ListItemName,
} from 'components/common/List/ListItem/ListItem.styled';
import { Link } from 'react-router-dom';
import { Author } from 'types/author';

import missingAuthorImage from 'assets/images/missing-author-image.jpeg';

type Props = {
  author: Author;
};

function GenreAuthor({ author }: Props) {
  return (
    <ListItem>
      <ListItemImage>
        <img src={missingAuthorImage} alt={author.name} />
      </ListItemImage>
      <ListItemContentWrapper>
        <ListItemName>
          <Link to={routes.authorsDetail(author.id)}>
            { author.name }
          </Link>
        </ListItemName>
        <ListItemContent>
          { author.bio }
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default GenreAuthor;
