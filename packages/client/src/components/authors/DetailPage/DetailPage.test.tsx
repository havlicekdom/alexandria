import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { getAuthorsDetail, selectAuthorsDetail } from 'store/authors/authorsSlice';
import { mockAuthor } from 'utils/tests';
import { Author } from 'types/author';

import DetailPage from './DetailPage';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Author) => callback(),
}));
jest.mock('store/authors/authorsSlice');
jest.mock('react-router-dom');

describe('DetailPage', () => {
  it('should call API method to fetch data on mount', async () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ authorId: 'test-id' });
    (getAuthorsDetail as jest.MockedFunction<typeof getAuthorsDetail>).mockImplementation();
    (selectAuthorsDetail as jest.MockedFunction<typeof selectAuthorsDetail>)
      .mockReturnValue(mockAuthor);

    render(<DetailPage />);
    await waitFor(() => expect(getAuthorsDetail).toHaveBeenCalled());
  });
});
