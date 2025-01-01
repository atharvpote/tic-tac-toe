import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Simple tic tac toe game",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`subpixel-antialiased`}>{children}</body>
    </html>
  );
}
