import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from 'components/common/List/ListItem';
import { ListItemContent, ListItemContentItem, ListItemContentWrapper } from 'components/common/List/ListItem/ListItem.styled';
import { Genre as GenreType } from 'types/genre';

import * as S from './Genre.styled';

type Props = {
  genre: GenreType;
};

function Genre({ genre }: Props) {
  return (
    <ListItem data-testid="genre">
      <ListItemContentWrapper>
        <Link to={`/genres/${genre.id}`}>
          <S.GenreName>
            { genre.name }
          </S.GenreName>
        </Link>
        <ListItemContent>
          <ListItemContentItem>
            { genre.bio }
          </ListItemContentItem>
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default Genre;
