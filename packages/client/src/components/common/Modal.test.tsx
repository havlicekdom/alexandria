
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '../Modal';

describe('Modal', () => {
  it('call close function on x click', () => {
    const spy = jest.fn();
    render(<Modal close={spy}>Test modal</Modal>);
    userEvent.click(screen.getByTestId('modal-close'));
    expect(spy).toHaveBeenCalled();
  });

  it('call close function on background click', () => {
    const spy = jest.fn();
    render(<Modal close={spy}>Test modal</Modal>);
    userEvent.click(screen.getByTestId('modal-background'));
    expect(spy).toHaveBeenCalled();
  });
});
