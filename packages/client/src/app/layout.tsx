import { Snackbars } from "components/common/Snackbars";
import "./globals.css";

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
      <body className="bg-">
        <Snackbars />
        <div className="flex flex-row min-h-screen">{children}</div>
      </body>
    </html>
  );
}
