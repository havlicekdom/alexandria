import React from 'react';
import { Link } from 'react-router-dom';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-mini';
import ListItem from 'components/common/List/ListItem';
import Icon from 'components/common/Icon';
import { Author as AuthorType } from 'types/author';

import * as S from './Author.styled';

type Props = {
  author: AuthorType;
}

function Author({ author }: Props) {
  return (
    <ListItem data-testid="author">
      <S.AuthorIcon>
        <Icon icon={faUserPen} />
      </S.AuthorIcon>
      <S.AuthorContent>
        <Link to={`/authors/${author.id}`}>
          <S.AuthorName>
            { author.name }
          </S.AuthorName>
        </Link>
        <S.AuthorBio>
          <S.AuthorBioItem>
            { `Born ${moment(author.dateOfBirth, 'YYYY-MM-DD').toDate().toLocaleDateString()}` }
          </S.AuthorBioItem>
          <S.AuthorBioItem>
            { author.bio }
          </S.AuthorBioItem>
        </S.AuthorBio>
      </S.AuthorContent>
    </ListItem>
  );
}

export default Author;
