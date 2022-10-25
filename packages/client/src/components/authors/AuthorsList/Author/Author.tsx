import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-mini';
import routes from 'constants/routes';
import ListItem from 'components/common/List/ListItem';
import {
  ListItemContent, ListItemContentItem, ListItemContentWrapper, ListItemImage,
} from 'components/common/List/ListItem/ListItem.styled';
import { Author as AuthorType } from 'types/author';

import missingAuthorImage from 'assets/images/missing-author-image.jpeg';

import * as S from './Author.styled';

type Props = {
  author: AuthorType;
}

function Author({ author }: Props) {
  return (
    <ListItem data-testid="author">
      <ListItemImage>
        <img src={missingAuthorImage} alt="" />
      </ListItemImage>
      <ListItemContentWrapper>
        <Link to={routes.authorsDetail(author.id)}>
          <S.AuthorName>
            { author.name }
          </S.AuthorName>
        </Link>
        <ListItemContent>
          <ListItemContentItem>
            { `Born ${moment(author.dateOfBirth, 'YYYY-MM-DD').toDate().toLocaleDateString()}` }
          </ListItemContentItem>
          <ListItemContentItem>
            { author.bio }
          </ListItemContentItem>
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default Author;
