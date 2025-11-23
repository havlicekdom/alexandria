import { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import { ThemeContext } from 'context/ThemeContext';
import ListItem from 'components/common/List/ListItem';
import { ListItemContent, ListItemContentItem, ListItemContentWrapper } from 'components/common/List/ListItem/ListItem.styled';
import { Genre as GenreType } from 'types/genre';

import * as S from './Genre.styled';

type Props = {
  genre: GenreType;
};

function Genre({ genre }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <ListItem data-testid="genre">
      <ListItemContentWrapper>
        <Link to={routes.genresDetail(genre.id)}>
          <S.GenreName>
            { genre.name }
          </S.GenreName>
        </Link>
        <ListItemContent $currentTheme={theme}>
          <ListItemContentItem>
            { genre.bio }
          </ListItemContentItem>
        </ListItemContent>
      </ListItemContentWrapper>
    </ListItem>
  );
}

export default Genre;
