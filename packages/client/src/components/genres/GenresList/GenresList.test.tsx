
import { getGenresList, selectGenresList } from 'store/genres/genresSlice';
import { mockGenre, renderWithRouter } from 'utils/tests';
import { Genre } from 'types/genre';

import GenresList from './GenresList';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Genre[]) => callback(),
}));

jest.mock('store/genres/genresSlice');

describe('GenresList', () => {
  it('should render a list of Author components when authors exist in store', () => {
    (getGenresList as jest.MockedFunction<typeof getGenresList>).mockImplementation();
    (selectGenresList as jest.MockedFunction<typeof selectGenresList>)
      .mockReturnValue([mockGenre]);

    const { getAllByTestId } = renderWithRouter(<GenresList />);
    expect(getAllByTestId('genre')).toHaveLength(1);
  });

  it('should call action to fetch data on mount', () => {
    (getGenresList as jest.MockedFunction<typeof getGenresList>).mockImplementation();
    (selectGenresList as jest.MockedFunction<typeof selectGenresList>)
      .mockReturnValue([mockGenre]);

    renderWithRouter(<GenresList />);
    expect(getGenresList).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getGenresList as jest.MockedFunction<typeof getGenresList>).mockImplementation();
    (selectGenresList as jest.MockedFunction<typeof selectGenresList>)
      .mockReturnValue([mockGenre]);

    renderWithRouter(<GenresList />);
    expect(selectGenresList).toHaveBeenCalled();
  });
});
