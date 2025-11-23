import "normalize.css/normalize.css";
import { ThemeProvider } from "context/ThemeContext";
import { store } from "store/store";
import { injectStore } from "utils/api";
import ReduxProvider from "store/ReduxProvider";
import { Snackbars } from "components/common/Snackbars/Snackbars";
import StyledComponentsRegistry from "lib/registry";
import ClientLayout from "lib/client-layout";
injectStore(store);

export const metadata = {
  title: "Alexandria",
  description: "Web app for library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Snackbars />
          <StyledComponentsRegistry>
            <ThemeProvider>
              <ClientLayout>{children}</ClientLayout>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
