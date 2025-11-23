'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
import { ThemeVariants } from 'constants/styles/theme';

type InitialState = {
  theme: ThemeVariants;
  setTheme: Dispatch<SetStateAction<ThemeVariants>>;
};

const initialState: InitialState = {
  theme: ThemeVariants.Dark,
  setTheme: () => ({}),
};

const ThemeContext = createContext(initialState);

ThemeContext.displayName = 'ThemeContext';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(ThemeVariants.Dark);

  const themeContextValues = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={themeContextValues}>
      { children }
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
