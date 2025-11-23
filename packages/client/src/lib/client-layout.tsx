"use client";

import { GlobalStyles, App } from "components/App.styled";
import { ThemeContext } from "context/ThemeContext";
import { ReactNode, useContext } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <GlobalStyles $currentTheme={theme} />
      <App $currentTheme={theme}>
        {children}
      </App>
    </>
  );
}
