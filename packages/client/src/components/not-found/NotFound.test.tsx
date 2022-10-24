import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { renderWithRouter } from 'utils/tests';

import NotFound from './NotFound';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFound', () => {
  it('should navigate to homepage on button click', async () => {
    const { getByTestId } = renderWithRouter(<NotFound />);

    await userEvent.click(getByTestId('home-button'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});
