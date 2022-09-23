import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Button', () => {
  it('call onClick function on click', () => {
    const spy = jest.fn();
    render(<Button variant="link" onClick={spy}>Test link</Button>);
    userEvent.click(screen.getByText('Test link'));
    expect(spy).toHaveBeenCalled();
  });
});
