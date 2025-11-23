
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Snackbar from './Snackbar';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

describe('Snackbar', () => {
  it('should auto hide after 3000ms', async () => {
    render(<Snackbar $variant="success">Test message</Snackbar>);

    await waitFor(() => expect(screen.getByText('Test message')).not.toBeVisible(), { timeout: 3000 });
  });

  it('should hide after click on close', async () => {
    render(<Snackbar $variant="success">Test message</Snackbar>);

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Test message')).not.toBeVisible());
  });
});
