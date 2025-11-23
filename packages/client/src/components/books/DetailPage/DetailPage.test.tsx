
import { render, waitFor } from '@testing-library/react';
import { getBooksDetail, selectBooksDetail } from 'store/books/booksSlice';
import { mockBook } from 'utils/tests';
import { Author } from 'types/author';

import DetailPage from './DetailPage';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Author) => callback(),
}));
jest.mock('store/books/booksSlice');
jest.mock('react-router-dom', () => ({
  Link: (
    { children, to } : { children: React.ReactNode, to: string},
  ) => (<a href={to}>{ children }</a>),
  useParams: () => ({ bookId: 'test-id' }),
}));

describe('DetailPage', () => {
  it('should call API method to fetch data on mount', async () => {
    (getBooksDetail as jest.MockedFunction<typeof getBooksDetail>).mockImplementation();
    (selectBooksDetail as jest.MockedFunction<typeof selectBooksDetail>)
      .mockReturnValue(mockBook);

    render(<DetailPage />);
    await waitFor(() => expect(getBooksDetail).toHaveBeenCalled());
  });
});
