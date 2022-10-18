import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { getGenresDetail, selectGenresDetail } from 'store/genres/genresSlice';
import { mockGenre } from 'utils/tests';
import { Genre } from 'types/genre';

import DetailPage from './DetailPage';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Genre) => callback(),
}));
jest.mock('store/genres/genresSlice');
jest.mock('react-router-dom');

describe('DetailPage', () => {
  it('should call API method to fetch data on mount', async () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ genreId: 'test-id' });
    (getGenresDetail as jest.MockedFunction<typeof getGenresDetail>).mockImplementation();
    (selectGenresDetail as jest.MockedFunction<typeof selectGenresDetail>)
      .mockReturnValue(mockGenre);

    render(<DetailPage />);
    await waitFor(() => expect(getGenresDetail).toHaveBeenCalled());
  });
});
