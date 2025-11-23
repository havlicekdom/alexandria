
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FloatingButton from './FloatingButton';

describe('FloatingButton', () => {
  it('call onClick function on click', () => {
    const spy = jest.fn();
    render(<FloatingButton onClick={spy}>Test button</FloatingButton>);
    userEvent.click(screen.getByText('Test button'));
    expect(spy).toHaveBeenCalled();
  });
});
