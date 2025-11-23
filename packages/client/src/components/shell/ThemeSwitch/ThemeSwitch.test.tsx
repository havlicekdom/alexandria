
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from 'context/ThemeContext';
import { ThemeVariants } from 'constants/styles';

import ThemeSwitch from './ThemeSwitch';

const customRender = (theme = ThemeVariants.Dark) => {
  const setTheme = jest.fn();

  return {
    setTheme,
    ...render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSwitch />
      </ThemeContext.Provider>,
    ),
  };
};

describe('ThemeSwitch', () => {
  it('should render with "Light mode" text when theme is dark', async () => {
    const { getAllByText } = customRender();

    expect(getAllByText('Light mode')).toHaveLength(1);
  });

  it('should render with "Dark mode" text when theme is light', async () => {
    const { getAllByText } = customRender(ThemeVariants.Light);

    expect(getAllByText('Dark mode')).toHaveLength(1);
  });

  it('should call context method on click with correct theme', () => {
    const { setTheme, getByRole } = customRender();

    userEvent.click(getByRole('button'));
    expect(setTheme).toHaveBeenCalledWith(ThemeVariants.Light);
  });
});
