import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-mini';
import ListItem from 'components/common/List/ListItem';
import { Author as AuthorType } from 'types/author';

import missingAuthorImage from 'assets/images/missing-author-image.jpeg';

import * as S from './Author.styled';

type Props = {
  author: AuthorType;
}

function Author({ author }: Props) {
  return (
    <ListItem data-testid="author">
      <S.AuthorImage>
        <img src={missingAuthorImage} alt="" />
      </S.AuthorImage>
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
