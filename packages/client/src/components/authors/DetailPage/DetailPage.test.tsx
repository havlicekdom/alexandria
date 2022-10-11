import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { fetchAuthorsDetail } from 'store/authors/authorsAPI';
import { createMockAxiosResponse, mockAuthor } from 'utils/tests';

import DetailPage from './DetailPage';

jest.mock('store/authors/authorsAPI');
jest.mock('react-router-dom');

describe('DetailPage', () => {
  it('should call API method to fetch data on mount', async () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ authorId: 'test-id' });
    (fetchAuthorsDetail as jest.MockedFunction<typeof fetchAuthorsDetail>)
      .mockResolvedValue(createMockAxiosResponse(mockAuthor));

    render(<DetailPage />);
    await waitFor(() => expect(fetchAuthorsDetail).toHaveBeenCalled());
  });
});
