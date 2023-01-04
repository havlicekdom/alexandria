import React, { useMemo, useState } from 'react';
import { ThemeVariants } from 'constants/styles/theme';

type InitialState = {
  theme: ThemeVariants;
  setTheme: React.Dispatch<React.SetStateAction<ThemeVariants>>;
};

const initialState: InitialState = {
  theme: ThemeVariants.Dark,
  setTheme: () => ({}),
};

const ThemeContext = React.createContext(initialState);

ThemeContext.displayName = 'ThemeContext';

function ThemeProvider({ children }: { children: React.ReactNode }) {
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
