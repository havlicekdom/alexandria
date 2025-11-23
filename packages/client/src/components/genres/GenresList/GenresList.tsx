import { useEffect } from 'react';
import List from 'components/common/List';
import Panel from 'components/common/Panel';
import { getGenresList, selectGenresList } from 'store/genres/genresSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Genre from './Genre';

function GenresList() {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenresList);

  useEffect(() => {
    dispatch(getGenresList(null));
  }, []);

  const renderGenres = () => (genres.map((genre) => (<Genre key={genre.id} genre={genre} />)));

  return (
    <Panel $portion={2}>
      <List>
        { renderGenres() }
      </List>
    </Panel>
  );
}

export default GenresList;
